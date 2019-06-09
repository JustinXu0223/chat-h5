/*
 * @component base.js
 * @description 基本方法库
 * @time 2018/4/12
 * @author JUSTIN
 */

const ratio = 100 * (0.375); // basic iPhone6

// rem
export function px2rem(pxValue) {
  let res;
  // 针对template literals
  if (Array.isArray(pxValue)) {
    [res] = pxValue;
  }
  res = parseInt(pxValue, 10);
  return `${res / ratio}rem`;
}

export function delay(time = 500) {
  return new Promise(resolve => setTimeout(() => resolve(time), time));
}

// 递归倒计时
export const startCountdown = ({ seconds, loopFunc, doneFunc }) => {
  if (Number.isNaN(Number(seconds))) throw TypeError('First parameter cannot be converted to number');
  if (typeof loopFunc !== 'function') throw TypeError('Second Parameter should be a function');
  if (typeof doneFunc !== 'function') throw TypeError('Third Parameter should be a function');
  let countdown = seconds;
  return setTimeout(function timeout() {
    countdown -= 1;
    if (countdown > 0) {
      loopFunc(countdown, setTimeout(timeout, 1000));
    } else {
      doneFunc();
    }
  }, 1000);
};

// 设置title兼容方案
export function setTitle(title = '') {
  document.title = title;
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    const i = document.createElement('iframe');
    i.src = '/public/favicon.ico';
    i.style.display = 'none';
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}
