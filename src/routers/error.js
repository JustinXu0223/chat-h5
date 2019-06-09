/*
 * @component error.js
 * @description 错误模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */
// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.notFound,
    component: () => import('../views/error/notFound'),
    meta: {
      title: '404',
      keepAlive: false,
    },
  },
];
