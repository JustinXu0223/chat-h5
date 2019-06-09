const core = require('mathjs/core');

const math = core.create();

math.import(require('mathjs/lib/function/arithmetic/add'));
math.import(require('mathjs/lib/function/arithmetic/subtract'));
math.import(require('mathjs/lib/function/arithmetic/multiply'));
math.import(require('mathjs/lib/function/arithmetic/divide'));
math.import(require('mathjs/lib/function/arithmetic/floor'));
math.import(require('mathjs/lib/function/probability/combinations'));

_.mixin({
  combinations: math.combinations,

  unique(arr) {
    const unique = [];
    const repeat = [];
    const hash = {};

    if (!_.isEmpty(arr)) {
      const { length } = arr;
      let i = 0;
      let elem;
      for (; i < length; i++) {
        elem = arr[i];
        if (!hash[elem]) {
          unique.push(elem);
          hash[elem] = true;
        } else {
          repeat.push(elem);
        }
      }
    }

    return {
      unique,
      repeat,
    };
  },

  convert2yuan(money, options) {
    options = _.extend({}, {
      fixed: 2,
      ratio: 1,
      clear: true,
    }, options);

    return _.formatDiv(money, options.ratio, options);
  },

  formatDiv(money, ratio, options) {
    let format;

    money = money || 0;

    options = _.extend({}, {}, options);

    if (!_.isUndefined(money)) {
      format = _.div(money, ratio);

      if (options.fixed || options.fixed === 0) {
        format = format.toFixed(options.fixed);
      }

      if (options.clear) {
        format = math.add(format, 0);
      }
    }

    return format;
  },

  fixed(number, ratio, symbol = false) {
    number = number.toFixed(ratio);
    if (symbol) {
      if (number > 0) {
        number = `+${number}`;
      } else if (number < 0) {
        number = `-${number}`;
      } else {
        number = `${number}`;
      }
    }

    return number;
  },

  // 格式化时间
  toTime(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD H:mm:ss') : timestamp;
  },

  toDate(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD') : timestamp;
  },

  add(arg1, arg2) {
    return math.add(arg1, arg2);
  },

  // 除法   arg1除arg2
  div(arg1, arg2) {
    arg1 = arg1 || 0;
    return math.divide(arg1, arg2);
  },

  // 乘法  arg1乘arg2
  mul(arg1, arg2) {
    arg1 = arg1 || 0;
    return math.multiply(arg1, arg2);
  },

  // 减法 arg1减arg2
  sub(arg1, arg2) {
    return math.subtract(arg1, arg2);
  },

  floor(arg1, index) {
    const sArg1 = String(arg1);
    const pos = sArg1.indexOf('.');
    if (pos > -1) {
      return Number(sArg1.substring(0, pos + index + 1));
    }
    return arg1;
  },

  /**
   *
   * https://github.com/freearhey/vue2-filters.git
   * 12345 => $12,345.00
   *
   * @param {String} symbol
   * @param {Number} decimals Decimal places
   * @param {Object} options
   */

  currency(value, symbol = '', decimals = 2, options) {
    const digitsRE = /(\d{3})(?=\d)/g;
    options = options || {};
    value = parseFloat(value);
    if (!Number.isFinite(value) || (!value && value !== 0)) return '';

    const thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ',';

    const symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true;

    const spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false;

    // let stringified = Math.abs(value).toFixed(decimals);
    let stringified = _.floor(Math.abs(value), decimals).toFixed(decimals);
    // let stringified = _.floor(Math.abs(value), decimals);

    stringified = options.decimalSeparator
      ? stringified.replace('.', options.decimalSeparator)
      : stringified;

    const _int = decimals
      ? stringified.slice(0, -1 - decimals)
      : stringified;

    const i = _int.length % 3;

    const head = i > 0
      ? (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : ''))
      : '';

    const _float = decimals
      ? stringified.slice(-1 - decimals)
      : '';

    /* eslint-disable */
    symbol = spaceBetweenAmountAndSymbol
      ? (symbolOnLeft ? `${symbol} ` : ` ${symbol}`)
      : symbol;

    symbol = symbolOnLeft
      ? symbol + head
      + _int.slice(i).replace(digitsRE, `$1${thousandsSeparator}`) + _float
      : head
      + _int.slice(i).replace(digitsRE, `$1${thousandsSeparator}`) + _float + symbol;

    const sign = value < 0 ? '-' : '';

    return sign + symbol;
  },

  _toConverter(value, constName) {
    try {
      return _.find(consts[constName], {
        value,
      }).title;
    } catch (e) {
      return value;
      // throw new Error(`${constName}没有找到对应的值${value}`);
    }
  },
});
