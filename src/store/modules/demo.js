/*
 * @component demo.js
 * @description demo store
 * @time 2019/5/9
 * @author JUSTIN
 */
// types
import * as demoTypes from '@/store/types/demo';

// initial state
const initState = {
  count: 0,
};

// getters
const getters = {
  [demoTypes.GET_COUNT](state) {
    return state.count;
  },
};

// actions
const actions = {
  [demoTypes.DECREMENT_REQ]({ commit }) {
    commit(demoTypes.UPDATE_COUNT, 1);
  },
  [demoTypes.INCREMENT_REQ]({ commit }) {
    commit(demoTypes.UPDATE_COUNT, -1);
  },
};

// mutations
const mutations = {
  [demoTypes.UPDATE_COUNT](state, num) {
    state.count += num;
  },
};

export default {
  state: initState,
  getters,
  actions,
  mutations,
};
