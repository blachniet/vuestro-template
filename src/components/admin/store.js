/* global BACKEND_URL, axios, _ */

const URL = `${BACKEND_URL}/api/v1/users`;

export default {
  namespaced: true,
  state: {
    usersLoaded: false, // successful load from server
    users: [],
  },
  getters: {
    usersLoaded(state) {
      return state.usersLoaded;
    },
    users(state) {
      return state.users;
    },
    numUsers(state) {
      return state.users.length;
    },
    user: (state) => (_id) => {
      let user = _.find(state.users, { _id });
      if (user) return user;
      return null;
    },
  },
  actions: {
    loadUsers({ commit }) {
      // load users list
      return axios.get(URL).then((res) => {
        commit('usersLoaded', res.data);
      });
    },
    createUser({ commit }, obj) {
      return axios.post(URL, obj).then((res) => {
        this.dispatch('admin/loadUsers');
      });
    },
    updateUser({ commit }, obj) {
      return axios.put(`${URL}/${obj._id}`, obj).then((res) => {
        this.dispatch('admin/loadUsers');
      });
    },
    deleteUser({ commit }, obj) {
      return axios.delete(`${URL}/${obj._id}`).then((res) => {
        this.dispatch('admin/loadUsers');
      });
    },
  },
  mutations: {
    usersLoaded(state, data) {
      state.usersLoaded = true;
      state.users = data;
    },
  },
};