/* global axios, _ */

const EXAMPLE_URI = 'http://localhost:3000/api/v1/example';

export default {
  namespaced: true,
  state: {
    loaded: false,
    exampleData: [],
  },
  getters: {
    isExampleDataLoaded(state) {
      return state.loaded;
    },
    exampleData(state) {
      return state.exampleData;
    },
    exampleDataById: (state) => (_id) => {
      return _.find(state.exampleData, { _id });
    },
  },
  actions: {
    loadExampleData({ commit }) {
      return axios.get(EXAMPLE_URI).then((res) => {
        commit('exampleDataLoaded', res.data);
      });
    },
    addExampleItem({ commit }, d) {
      // we return the axios call because it returns a promise that can be
      // used at the caller to tell when it's complete. i.e. if you use a modal
      // to add an example item, you can use .then() or await to know when it's done and
      // close the modal
      return axios.post(EXAMPLE_URI, d).then((res) => {
        this.dispatch('example/loadExampleData');
      });
    },
    updateExampleItem({ commit }, d) {
      return axios.put(`${EXAMPLE_URI}/${d._id}`, {
        $set: d // mongo update operations allowed here
      }).then((res) => {
        this.dispatch('example/loadExampleData');
      });
    },
    deleteExampleItem({ commit }, d) {
      return axios.delete(`${EXAMPLE_URI}/${d._id}`, d).then((res) => {
        this.dispatch('example/loadExampleData');
      });
    },
  },
  mutations: {
    exampleDataLoaded(state, data) {
      state.exampleData = data;
      state.loaded = true;
    },
  },
};
