module.exports = {
  presets: [
    ["@babel/preset-env", {
        "targets": "> 0.25%, not dead"
    }]
],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-syntax-dynamic-import",
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": name => `${name}/style/less`
    }, "vant"],
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-modules-commonjs",
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-transform-runtime"
]
};
