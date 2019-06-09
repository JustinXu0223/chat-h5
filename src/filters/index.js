export default () => {
  Vue.filter('formatDiv', _.formatDiv);
  Vue.filter('toTime', _.toTime);
  Vue.filter('toDate', _.toDate);
  Vue.filter('currency', _.currency);
  Vue.filter('join', _.join);
};
