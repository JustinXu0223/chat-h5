import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Clipboard from 'clipboard';
import router from './routers';
import store from './store';
import { install } from './build';
import { px2rem } from './utils/base';
import App from './views';
import './boots';

install(Vue);

const {
  CONST_LIST = [],
} = process.env;
CONST_LIST.forEach((item) => {
  Object.defineProperty(Vue.prototype, item, {
    value: require(`./constants/${item}.js`).default,
  });
});
Object.defineProperty(Vue.prototype, '_result', { value: _.result });
// 处理模版无法自动px转rem
Object.defineProperty(Vue.prototype, 'px2rem', { value: px2rem });

sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Clipboard('.clipboard-btn');

export default new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
});
