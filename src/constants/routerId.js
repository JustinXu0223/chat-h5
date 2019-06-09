/*
 * @component routerId.js
 * @description 路由常量
 * @time 2019/5/9
 * @author JUSTIN
 */
const routerId = {
  root: '/',
  // auth stack
  auth: '/auth',
  signIn: '/signIn',
  signUp: '/signUp',
  // common stack
  demo: '/demo',
  // home stack
  home: '/home',
  // chat stack
  chats: '/chats',
  // contacts stack
  contacts: '/contacts',
  // mine stack
  mine: '/mine',
  // error stack
  notFound: '/404',
  any: '*',
};

// 显示底部
export const tabBarList = [
  routerId.home,
  routerId.chats,
  routerId.contacts,
  routerId.mine,
];

export default routerId;
