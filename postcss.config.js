const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    'postcss-cssnext': isProd ? {
      browsers: [
        'last 3 versions',
        'ie >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 6',
        'opera >= 12.1',
      ],
    } : {
      browsers: [
        'last 2 versions',
      ],
    },
    'postcss-unrgba': isProd ? {
      method: 'clone',
    } : false,
    'postcss-filter-gradient': isProd ? {} : false,
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*', '!border*'],
    },
  },
};
