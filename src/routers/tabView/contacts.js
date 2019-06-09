/*
 * @component contacts.js
 * @description 联系人模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */

// constants
import routerId from '@/constants/routerId';

export default [
  {
    path: routerId.contacts,
    component: () => import('../../views/tabView/contacts'),
    meta: {
      title: '联系人',
      keepAlive: true,
      footer: true,
    },
  },
];
