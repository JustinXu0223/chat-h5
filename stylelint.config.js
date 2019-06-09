module.exports = {
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'string-quotes': 'single', // 指定字串，单引号
    'max-nesting-depth': 3, // 允许嵌套的深度为3
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global'],
    }],
  },
  ignoreFiles: [
    '**/*.js',
  ],
};
