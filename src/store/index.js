import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serie: [],
    divider: null,
    interval: {},
    transformated: false,
    classMarks: [],
    vars: [],
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
    },
    setClassMarks(state, classMarks) {
      state.classMarks = classMarks
    },
    setVars(state) {
      let vars = state.classMarks.flatMap( cm => (cm.vars))
      vars = vars.sort((a, b) => a.index - b.index);
      state.vars = vars.map((v) => parseInt(v.var));
    },
  },
  getters: {
    serie: (state) => {
      return state.serie.map((n, i) => ({ index: i + 1, number: n }));
    },
  },
  actions: {},
  modules: {},
});
