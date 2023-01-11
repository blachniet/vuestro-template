/* global BACKEND_URL, axios */
const URL = `${BACKEND_URL}/api/v1/users/me`;

export default {
  namespaced: true,
  state: {
    profileLoaded: false,
    profile: {
      roles: [],
      permissions: [],
    },
    profileCache: {},
  },
  getters: {
    profileLoaded(state) {
      return state.profileLoaded;
    },
    profile(state) {
      return state.profile;
    },
    permissions(state) {
      return state.profile.permissions;
    },
    hasPermission: (state) => (permission) => {
      if (!permission) {
        return true;
      }
      return state.profile.permissions.indexOf(permission) > -1;
    },
    avatar(state) {
      if (state.profile.avatar) {
        return state.profile.avatar;
      }
      return require('@/assets/default-user.jpg');
    },
  },
  actions: {
    load({ commit }) {
      return axios.get(URL).then((res) => {
        commit('profileLoaded', res.data);
      }).catch(() => {
        this.dispatch('auth/logout');
      });
    },
    setAvatar({ commit }, imgUrl) {
      return axios.put(URL, {
        avatar: imgUrl,
      }).then((res) => {
        this.dispatch('profile/load');
      });
    },
    loadProfileByUserId({ commit, state }, user_id) {
      if (user_id) {
        let cacheHit = state.profileCache[user_id];
        if (cacheHit) {
          // console.info(`profile cache hit for ${user_id}`);
          return Promise.resolve(cacheHit);
        } else {
          return axios.get(`${BACKEND_URL}/api/v1/users/${user_id}`).then((res) => {
            console.log(res.data);
            commit('saveProfileToCache', {
              user_id,
              ...res.data,
            });
            return Promise.resolve(res.data);
          });
        }
      } else {
        console.error('loadProfileByUserId called without valid user_id', user_id);
      }
    },
  },
  mutations: {
    profileLoaded(state, data) {
      state.profile = data;
      state.profileLoaded = true;
    },
    saveProfileToCache(state, { user_id, avatar }) {
      state.profileCache[user_id] = avatar;
    },
  },
};