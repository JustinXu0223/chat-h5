/*
 * @component mine.js
 * @description 我的模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */

// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.mine,
    component: () => import('../../views/tabView/mine/mine'),
    meta: {
      title: '我的',
      keepAlive: true,
      footer: true,
    },
  },
];
