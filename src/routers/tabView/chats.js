/*
 * @component chats.js
 * @description 聊天模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */

// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.chats,
    component: () => import('../../views/tabView/chats'),
    meta: {
      title: '聊天',
      keepAlive: true,
      footer: true,
    },
  },
];
