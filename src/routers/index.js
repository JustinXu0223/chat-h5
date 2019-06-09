/*
 * @component index.js
 * @description 根模块路由配置
 * @time 2019/5/9
 * @author JUSTIN
 */
import Vue from 'vue';
import Router from 'vue-router';

// store
import store from '../store';

// screen
import Layout from '../views/index';

// constants
import routerId, { tabBarList } from '@/constants/routerId';
import * as globalTypes from '@/store/types/global';

// utils
import { setTitle } from '@/utils/base';

// routers
import authStack from './auth';
import commonStack from './common';
import errorStack from './error';

import homeStack from './tabView/home';
import chatsStack from './tabView/chats';
import contactsStack from './tabView/contacts';
import mineStack from './tabView/mine';

Vue.use(Router);

const routes = [
  {
    path: routerId.root,
    component: Layout,
    redirect: routerId.home,
    children: [
      ...authStack,
      ...mineStack,
      ...homeStack,
      ...chatsStack,
      ...contactsStack,
      ...commonStack,
    ],
  },
  ...errorStack,
  {
    path: routerId.any,
    redirect: routerId.notFound,
  },
];

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes,
  scrollBehavior(to, from) {
    if (_.get(to, 'meta.scrollToTopAtSamePage', true) || to.name !== from.name) {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
let isPush = false;
let isTouchStart = false;
let endTime = Date.now();
const methods = ['push', 'go', 'replace', 'forward', 'back'];

document.addEventListener('touchend', () => {
  isTouchStart = false;
  endTime = Date.now();
});
document.addEventListener('touchstart', () => {
  isTouchStart = true;
});
methods.forEach((key) => {
  const method = router[key].bind(router);
  router[key] = (...args) => {
    isPush = true;
    /* eslint-disable prefer-spread */
    method.apply(null, args);
  };
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    setTitle(to.meta.title);
  }

  const toPath = to.path;
  const fromPath = from.path;

  const toIndex = history.getItem(toPath);
  const fromIndex = history.getItem(fromPath);
  let direction;

  const isTabView = tabBarList.includes(toPath) && tabBarList.includes(fromPath);
  // 动画相关
  if (toIndex) {
    if (isTabView) {
      direction = '';
    } else if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      direction = 'forward';
    } else {
      direction = 'reverse';
    }
  } else if (isTabView) {
    direction = '';
    history.setItem(toPath, 1);
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    if (toPath !== routerId.root) {
      history.setItem(toPath, historyCount);
    }
    direction = 'forward';
  }

  // 判断是否是ios左滑返回 或者 右滑前进
  if (toIndex && toIndex !== '0' && !isPush && (((Date.now() - endTime) < 377) || isTouchStart)) {
    store.commit(globalTypes.UPDATE_DIRECTION, '');
  } else {
    store.commit(globalTypes.UPDATE_DIRECTION, direction);
  }
  isTouchStart = false;

  next();
});


// router.afterEach((to, from) => {
// });

export default router;
