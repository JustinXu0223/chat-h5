import SvgIcon from './index.vue';

/* istanbul ignore next */
SvgIcon.install = (Vue) => {
  Vue.component(SvgIcon.name, SvgIcon);
};

export default SvgIcon;
