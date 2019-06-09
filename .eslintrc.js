
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "globalReturn":true,
      "legacyDecorators": true,
      "impliedStrict":true
    }
  },
  "env": {
    "es6": true,
    "jquery": true,
    "browser": true,
    "node": true,
    "commonjs": true,
    "mocha": true
  },
  "globals": {
    "Vue": true,
    "_": true,
    "mapGetters": true,
    "mapState": true,
    "types": true,
    "Velocity": true,
    "moment": true,
    "Raven": true,
    "code": true,
    "api": true,
    "consts": true,
    "TweenLite": true,
    "TweenMax": true,
    "TweenlineLite": true,
    "TimelineMax": true,
    "Power0": true,
    "Power1": true,
    "Power2": true,
    "Power3": true,
    "Power4": true,
    "Elastic": true,
    "Back": true,
    "Expo": true,
    "Quad": true,
    "Quart": true,
    "PIXI": true,
    "RoughEase": true,
    "routerId": true,
    "process": true
  },
  "plugins": [
    "vue"
  ],
  "extends": [
    "plugin:vue/essential",
    "airbnb-base"
  ],
  "rules": {
    "no-debugger": isProd ? 2 : 0,
    "no-console": isProd ? 2 : 0,
    "global-require": 0, // 禁止require 用在 function 里面
    "import/no-unresolved": 0, // 绝对路径
    "import/no-dynamic-require": 0, // 变量require
    "no-param-reassign": 0, // 禁止对函数参数再赋值
    "consistent-return": 0, // 函数必须返回一个指定类型的值
    "no-plusplus": 0, // 允许使用 i++ / i--
    "max-len": [2, { // 强制行的最大长度
      "code": 160,
      "tabWidth": 4,
      "ignoreUrls": true,
      "ignoreTrailingComments": true,
      "ignoreTemplateLiterals": true
    }],
    "valid-jsdoc": 2, // 强制使用有效的 JSDoc 注释
    "array-callback-return": 0, // 递归不要求必须返回
    "no-underscore-dangle": 0, // 允许使用下划线开始
    "import/prefer-default-export": 0, // 不需要默认default导出
    "camelcase": 0 // 不要求使用骆驼拼写法
  }
};
