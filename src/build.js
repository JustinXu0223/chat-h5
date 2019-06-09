import VueQriously from 'vue-qriously';

// vant
import { Icon } from 'vant';

// directives
import TransferDom from '@/directives/transfer-dom';
import VueObserveVisibility from 'vue-observe-visibility';

// plugins
import BusPlugin from '@/plugins/bus';

// components
import SvgIcon from '@/components/svg-icon';
import Button from '@/components/button';
import Header from '@/components/layout/header';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.min.css';

import 'lib-flexible';

import VueClipboard from 'vue-clipboard2';

// filters
import filterImport from './filters';

// register global utility filters.
filterImport();

// components
export const components = [
  // vant

  // custom
  SvgIcon,
  Button,
  Header,
];

// install
export const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // vant
  Vue.use(Icon);

  Vue.use(BusPlugin);
  Vue.use(VueAwesomeSwiper);
  Vue.use(VueObserveVisibility);
  Vue.use(VueQriously);
  Vue.use(VueClipboard);

  Vue.directive('TransferDom', TransferDom);
};

// mixins
export * from './mixins';
