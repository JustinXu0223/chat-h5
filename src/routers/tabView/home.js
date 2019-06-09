/*
 * @component home.js
 * @description 首页模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */
// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.home,
    component: () => import('../../views/tabView/home/home'),
    meta: {
      title: '首页',
      keepAlive: true,
      footer: true,
    },
  },
];
