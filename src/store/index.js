import Vue from 'vue';
import Vuex from 'vuex';

// types
import * as globalTypes from '@/store/types/global';

// modules
import demoStore from './modules/demo';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV !== 'production';

const initState = {
  direction: 'forward',
  theme: 'light', // light / dark
};

const actions = {};

const getters = {
  [globalTypes.GET_DIRECTION](state) {
    return state.direction;
  },
  [globalTypes.GET_THEME](state) {
    return state.theme;
  },
};

const mutations = {
  [globalTypes.UPDATE_DIRECTION](state, direction) {
    state.direction = direction;
  },
  [globalTypes.UPDATE_THEME](state, theme) {
    state.theme = theme;
  },
};

const store = new Vuex.Store({
  strict: isDev,
  state: initState,
  actions,
  getters,
  mutations,
  modules: {
    demoStore,
  },
});

export default store;
