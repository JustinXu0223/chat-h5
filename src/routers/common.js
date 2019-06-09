/*
 * @component common.js
 * @description 通用模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */
// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.demo,
    component: () => import('../views/common/demo/index'),
    meta: {
      title: '测试页面',
      keepAlive: false,
    },
  },
];
