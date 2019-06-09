const _ = require('lodash');
const webpack = require('webpack');

const HappyPack = require('happypack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

// sentry sourcemap upload
const SentryCliPlugin = require('@sentry/webpack-plugin');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const utils = require('./webpack.util.js');

const happyThreadPool = HappyPack.ThreadPool({
  size: 5,
});

const {
  SERVER_IP,
  NODE_ENV,
  ENVIRONMENT,
  npm_package_version,
} = process.env;
const isDEV = NODE_ENV !== 'production';

const themeVariables = lessToJs(fs.readFileSync(utils.resolvePath('./src/themes/vant-theme-vars.less'), 'utf8'));

const svgoConfig = require('./svgo-config');
const svgoColorfulConfig = require('./svgo-colorful-config');

const constList = utils.getEntryMap(utils.getAllFileList('./src/constants'));

function getConstMap() {
  const provideMap = {};
  const aliasMap = {};
  constList.forEach((v) => {
    provideMap[v] = [v, 'default'];
    aliasMap[v] = utils.resolvePath(`src/constants/${v}`);
  });
  return {
    provideMap,
    aliasMap,
  };
}

const appConfig = {
  entry: {
    main: './src/main.js',
  },
  port: 8081,
  entries: {
    index: {
      title: 'chat',
      template: './public/index.html',
      chunks: ['commons', 'vendor', 'main'],
    },
  },
  output: {
    path: 'main',
    publicPath: '/',
  },
};

//= =============entry================
const entry = _(appConfig.entry).reduce((entries, entry, entryName) => {
  if (isDEV) {
    entry = [
      `webpack-dev-server/client?http://localhost:${appConfig.port}`,
      'webpack/hot/only-dev-server',
    ].concat(entry);
  }
  entries[entryName] = entry;

  return entries;
}, {});

//= =============output================
const output = {
  path: utils.resolvePath(`www/${appConfig.output.path}`),
  publicPath: appConfig.output.publicPath,
};

if (isDEV) {
  output.filename = '[name].bundle.js';
  output.chunkFilename = '[name].bundle.js';
} else {
  output.filename = '[name].[hash].bundle.js';
  output.chunkFilename = '[name].[hash].bundle.js';
}

//= =============plugins================
const plugins = [
  new webpack.ProvidePlugin({
    Vue: ['vue', 'default'],
    _: 'lodash',
    ...getConstMap().provideMap,
  }),
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /zh-cn/),

  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        cacheDirectory: true,
      },
    }],
  }),
  new HappyPack({
    id: 'scss',
    threadPool: happyThreadPool,
    loaders: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: './src/themes/index.scss',
        },
      },

    ],
  }),
  new CopyWebpackPlugin([
    {
      from: utils.resolvePath('./public'),
      to: '',
      force: true,
      ignore: ['*.html'],
    },
  ]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      ENVIRONMENT: JSON.stringify(ENVIRONMENT),
      APP_VERSION: JSON.stringify(npm_package_version),
      CONST_LIST: JSON.stringify(constList),
    },
  }),
];

if (process.env.MODE === 'analyse') {
  plugins.push(new BundleAnalyzerPlugin());
}

if (process.env.BABEL_ENV !== 'test') {
  plugins.push(new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(`./src/dll/${process.env.NODE_ENV}/vendor-manifest.json`),
    extensions: ['', '.js'],
  }));
}

if (isDEV) {
  if (process.env.BABEL_ENV !== 'test') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new StyleLintPlugin({
      // 正则匹配想要lint监测的文件 , 'src/**/*.l?(e|c)ss'
      files: ['src/**/*.vue'],
      syntax: 'scss',
    }));
  }
} else {
  plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash].styles.css',
    chunkFilename: '[id].[hash].styles.css',
  }));
  plugins.push(new CssoWebpackPlugin());

  plugins.push(new AssetsPlugin());
  plugins.push(new UglifyJsPlugin({
    sourceMap: true,
  }));
  plugins.push(new CompressionPlugin());

  plugins.push(new SentryCliPlugin({
    release: npm_package_version,
    include: './www/main',
    ignoreFile: '.sentrycliignore',
    ignore: ['node_modules', 'webpack.config.js'],
  }));
}

_(appConfig.entries).each((entryInfo, entryName) => {
  plugins.push(new HtmlWebpackPlugin({
    title: entryInfo.title,
    filename: `${entryName}.html`,
    template: entryInfo.template,
    chunks: entryInfo.chunks,
    chunksSortMode: 'manual',
    inject: 'body',
    favicon: entryInfo.favicon,
    resources: entryInfo.resources,
  }));
});

plugins.push(new AddAssetHtmlPlugin([{
  filepath: utils.resolvePath(`./src/dll/${process.env.NODE_ENV}/*.styles.css`),
  typeOfAsset: 'css',
  hash: true,
  includeSourcemap: false,
},
{
  filepath: utils.resolvePath(`./src/dll/${process.env.NODE_ENV}/*.js`),
  hash: true,
  includeSourcemap: true,
},
]));

//= =============modules================
const modules = {
  noParse: appConfig.noParse,
  rules: [{
    test: /\.(jpg|gif)$/,
    use: ['url-loader?limit=1024'],
  },
  {
    test: /\.png$/,
    use: ['url-loader?limit=1024!mimetype=image/png!./file.png'],
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000&minetype=application/font-woff',
  },
  {
    test: /\.less$/,
    use: [{
      loader: 'style-loader', // creates style nodes from JS strings
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'postcss-loader',
    }, {
      loader: 'less-loader',
      options: {
        modifyVars: themeVariables,
        javascriptEnabled: true,
      },
    }],
  },
  {
    test: /\.(ttf|otf|eot|svg|swf|mp3|mp4|flv|wav)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'file-loader',
    exclude: [utils.resolvePath('src/assets/svg')],
  },
  {
    test: /\.svg$/,
    include: [utils.resolvePath('src/assets/svg/colorful')],
    use: [{
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]',
      },
    },
    {
      loader: 'svgo-loader',
      options: svgoColorfulConfig,
    },
    ],
  },
  {
    test: /\.svg$/,
    include: [utils.resolvePath('src/assets/svg/single')],
    use: [{
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]',
      },
    },
    {
      loader: 'svgo-loader',
      options: svgoConfig,
    },
    ],
  },
  {
    test: /(.*)\.html$/,
    use: ['html-loader'],
    include: [
      utils.resolvePath('src'),
    ],
  },
  {
    test: require.resolve('snapsvg/dist/snap.svg.js'),
    use: 'imports-loader?this=>window,fix=>module.exports=0',
  },
  {
    test: /\.vue$/,
    type: 'javascript/auto',
    use: [{
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'happypack/loader?id=js',
          scss: isDEV ? [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/themes/index.scss',
                ],
              },
            },
          ] : [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/themes/index.scss',
                ],
              },
            },
          ],
          css: isDEV ? [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ] : [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      },
    }],
    include: [
      utils.resolvePath('src'),
    ],
  },
  {
    test: /\.js$/,
    type: 'javascript/auto',
    use: 'happypack/loader?id=js',
  },

  ],
};

if (isDEV) {
  modules.rules.push({
    test: /\.scss$/,
    use: 'happypack/loader?id=scss',
    include: [
      utils.resolvePath('src/themes'),
      utils.resolvePath('src/directives'),
    ],
  });

  modules.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  });

  modules.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.js',
        },
      },
    ],
  });
} else {
  modules.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
    include: [utils.resolvePath('src')],
  });

  modules.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ],
  });
}

module.exports = {
  mode: isDEV ? 'development' : 'production',
  devtool: isDEV ? 'source-map' : 'eval-source-map',
  entry,
  output,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
        },
      },
    },
  },
  resolve: {
    modules: [
      utils.resolvePath('src'),
      utils.resolvePath('node_modules'),
    ],
    extensions: ['.js', '.vue', '.scss', '.html'],
    alias: {
      '@': utils.resolvePath('src'),
      ...getConstMap().aliasMap,
    },
  },
  plugins,
  module: modules,
  stats: 'errors-only',
  devServer: {
    port: appConfig.port,
    publicPath: appConfig.output.publicPath,
    hot: true,
    clientLogLevel: 'error',
    historyApiFallback: true,
    inline: true,
    // https: true,
    // host: '0.0.0.0',
    progress: true,
    proxy: {
      '/api/**': {
        target: SERVER_IP,
        changeOrigin: true,
      },
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {
      'X-Custom-Header': 'yes',
    },
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      depth: false,
      entrypoints: true,
      hash: true,
      maxModules: 15,
      modules: false,
      performance: true,
      reasons: false,
      source: false,
      timings: true,
      version: false,
      warnings: true,
    },
    overlay: {
      // warnings: true,
      // errors: true,
    },
    // 取消框架域名检测
    disableHostCheck: true,
  },
};
