import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serie: [],
    divider: null,
    interval: {},
    transformated: false
  },
  mutations: {
    setSerie(state, serie) {
      state.serie = serie;
    },
    setDivider(state, divider) {
      state.divider = divider;
    },
    setInterval(state, interval) {
      state.interval = interval;
    },
    setTransformated(state, value) {
      state.transformated = value;
    }
  },
  getters: {
    serie: (state) => {
      return state.serie.map((n, i) => ({ index: i + 1, number: n }));
    },
  },
  actions: {},
  modules: {},
});
