/* global BACKEND_URL, axios, _ */

const URL = `${BACKEND_URL}/api/v1/roles`;

export default {
  namespaced: true,
  state: {
    loaded: false, // successful load from server
    roles: [],
    permissions: [],
  },
  getters: {
    rolesLoaded(state) {
      return state.loaded;
    },
    roles(state) {
      return state.roles;
    },
    rolesGetById: (state) => (_id) => {
      return _.find(state.roles, { _id });
    },
    rolesGetPermissions(state) {
      return state.permissions;
    },
    rolesGetPermissionTitleByValue: (state) => (id) => {
      let perm = _.find(_.flatMap(state.permissions, 'items'), { id });
      if (perm && perm.title) {
        return perm.title;
      }
      return id; // fallback if not-found
    },
  },
  actions: {
    load({ commit }) {
      // load roles list
      axios.get(URL).then((res) => {
        commit('rolesLoaded', res.data);
      });
      // load permissions list
      axios.get(`${URL}/permissions`).then((res) => {
        commit('rolesPermissionsLoaded', res.data);
      });
    },
    createRole({ commit }, obj) {
      axios.post(URL, obj).then((res) => {
        this.dispatch('roles/load');
      });
    },
    updateRole({ commit }, obj) {
      axios.put(`${URL}/${obj._id}`, obj).then((res) => {
        this.dispatch('roles/load');
      });
    },
    deleteRole({ commit }, obj) {
      axios.delete(`${URL}/${obj._id}`).then((res) => {
        this.dispatch('roles/load');
      });
    },
  },
  mutations: {
    rolesLoaded(state, data) {
      state.loaded = true;
      state.roles = data;
    },
    rolesPermissionsLoaded(state, data) {
      state.loaded = true;
      state.permissions = data;
    },
  },
};