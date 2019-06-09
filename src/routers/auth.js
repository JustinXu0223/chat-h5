/*
 * @component auth.js
 * @description 权限模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */
// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.signIn,
    component: () => import('../views/auth/signIn'),
    meta: {
      title: '登陆',
      keepAlive: false,
    },
  },
];
