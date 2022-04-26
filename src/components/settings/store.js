/* global _, axios */

const SETTINGS_URL = `/api/v1/settings`;

export default {
  namespaced: true,
  state: {
    loaded: false, // flag indicating a successful initial load from server
    settings: {    // settings object containing defaults
      miniSidebar: false,
      isDarkUI: true,
      showWelcome: true,
    },
  },
  getters: {
    isSettingsLoaded(state) {
      return state.loaded;
    },
    settings(state) {
      return state.settings;
    },
    isSidebarMini(state) {
      return state.settings.miniSidebar;
    },
    isDarkUI(state) {
      return state.settings.isDarkUI;
    },
    isShowWelcome(state) {
      return state.settings.showWelcome;
    },
  },
  actions: {
    loadSettings({ commit }) {
      // return axios.get(SETTINGS_URL).then((res) => {
      //   commit('settingsLoaded', res.data);
      // }).catch((err) => {
      //   this.dispatch('checkAuthForHTTPError', err);
      // });
    },
    saveSettings({ commit, state }) {
      // if (state.loaded) { // don't do it before initial load
      //   return axios.post(SETTINGS_URL, state.settings).then((res) => {
      //     commit('settingsSaved');
      //   }).catch((err) => {
      //     this.dispatch('checkAuthForHTTPError', err);
      //   });
      // }
    },
    resetSettings({ commit }) {
      // return axios.post(SETTINGS_URL, {}).then((res) => {
      //   this.dispatch('loadSettings');
      // }).catch((err) => {
      //   this.dispatch('checkAuthForHTTPError', err);
      // });
    },
    setSidebarMini({ commit }, val) {
      commit('setSidebarMini', val);
    },
    toggleIsDarkUI({ commit }) {
      commit('toggleIsDarkUI');
    },
    setShowWelcome({ commit }, val) {
      commit('setShowWelcome', val);
    },
  },
  mutations: {
    settingsLoaded(state, load) {
      // merge in the user's settings from the server to pick up any new keys
      _.merge(state.settings, load);
      state.loaded = true;
      console.info('settings loaded');
      // initiate a save to commit new defaults
      this.dispatch('settings/saveSettings');
    },
    settingsSaved(state) {
      console.info("settings saved"); // print this out to make over-saving obvious
    },
    setSidebarMini(state, val) {
      state.settings.miniSidebar = val;
      this.dispatch('settings/saveSettings');
    },
    toggleIsDarkUI(state) {
      state.settings.isDarkUI = !state.settings.isDarkUI;
      this.dispatch('settings/saveSettings');
    },
    setShowWelcome(state, val) {
      state.settings.showWelcome = val;
      this.dispatch('settings/saveSettings');
    },
  },
};