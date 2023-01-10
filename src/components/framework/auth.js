//
// JWT-based auth module
//
/* global BACKEND_URL, atob, localStorage, axios */

const TOKEN_LS_NAME = 'vuestroTemplateToken';
const LOGIN_URL = `${BACKEND_URL}/api/v1/auth/login`;
const RESET_URL = `${BACKEND_URL}/api/v1/auth/reset`;
const LOGOUT_URL = `${BACKEND_URL}/api/v1/auth/logout`;
const RENEW_URL = `${BACKEND_URL}/api/v1/auth/renew`;
const PROFILE_URL = `${BACKEND_URL}/api/v1/users/me`;

//
// Parse out the payload from a JWT
//
const parseTokenPayload = function(token) {
  if (token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  return null;
};
//
// Parse out the effective username (from 'sub' key) from token payload
//
const parseUsername = function(token) {
  if (token) {
    return parseTokenPayload(token).aud;
  }
  return 'Unknown';
};
//
// Check if token is valid
//
const isTokenValid = function(token) {
  let tokenValid = false;
  if (token) {
    let payload = parseTokenPayload(token);
    if (payload) {
      tokenValid = payload.exp > new Date().getTime()/1000;
    }
  }
  return tokenValid;
};

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem(TOKEN_LS_NAME),
    tokenWatcher: null,          // interval timer handle for token watcher
    tokenWatchInterval: 10000,   // interval in ms
    tokenWarnThreshold: 900,     // how many seconds left in session before we pop up warning
    tokenRemainingSeconds: null, // seconds remaining in the session
    tokenShowExpirationWarning: false, // flag informing the app that the warning should be shown
    pending: false,
    mustChangePass: false,
    errorMessage: null,
  },
  getters: {
    isLoggedIn(state) {
      return !state.mustChangePass && isTokenValid(state.token);
    },
    isLoggingIn(state) {
      return state.pending;
    },
    authErrorMessage(state) {
      return state.errorMessage;
    },
    token(state) {
      return state.token;
    },
    username(state) {
      return parseUsername(state.token);
    },
    mustChangePass(state) {
      return state.mustChangePass;
    },
    authIsSessionExpiring(state) {
      return state.tokenShowExpirationWarning;
    },
    authSessionRemainingSeconds(state) {
      return state.tokenRemainingSeconds;
    },
  },
  actions: {
    checkToken({ commit, state }) {
      if (state.token) {
        // set token for every axios transaction
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        // set default error handling for every axios transaction
        axios.interceptors.response.use(response => {
          return response;
        }, error => {
          this.dispatch('auth/checkAuthForHTTPError', error);
          return Promise.reject(error);
        });
        commit('authWatchToken');
      }
    },
    authWatchToken({ commit }) {
      commit('authWatchToken');
    },
    login({ commit }, creds) {
      commit('loggingIn'); // so UI can show spinner
      // post the login
      axios.post(LOGIN_URL, {
        username: creds.username,
        password: creds.password,
      }).then((res) => {
        if (res.data.mustChangePass) {
          return commit('loginMustChangePass', res.data);
        }
        // else see if token parses
        if (res.data.token && isTokenValid(res.data.token)) {
          commit('loginSuccess', res.data);
          // load profile
          this.dispatch('auth/loadProfile');
        }
      }).catch((err) => {
        if (err.message === 'Network Error') {
          commit('loginFailed', 'Backend down');
        } else if (err.response.status === 400) {
          commit('loginFailed', 'API Error');
        } else if (err.response.status === 401) {
          commit('loginFailed', err.response.data);
        }
      });
    },
    changePassword({ commit, state }, creds) {
      axios.post(RESET_URL, {
        username: creds.username,
        password: creds.password,
      }, {
        // set the authorization separately for password resets
        // since checkToken hasn't been called
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      }).then((res) => {
        commit('loginSuccess', res.data);
      });
    },
    logout({ commit }) {
      commit('loggedOut');
      return axios.post(LOGOUT_URL, null, {}).then((res) => {
        console.log('server acknowledged logout');
      }).catch((err) => {
        if (err.response.status === 500 || err.response.status === 400) {
          console.error('error logging out');
        }
      }).finally(() => {
        window.location.replace('/');
      });
    },
    checkAuthForHTTPError({ commit }, err) {
      if (err.response && err.response.status === 401) {
        console.warn('vuex call to backend returned 401, marking token expired');
        commit('tokenExpired');
      }
    },
    // make request to receive a new token
    authRenewToken({ commit }) {
      return axios.get(RENEW_URL).then((res) => {
        commit('loginSuccess', res.data);
      });
    },
  },
  mutations: {
    loggingIn(state) {
      state.pending = true;
      state.errorMessage = null;
    },
    loginSuccess(state, obj) {
      // save to browser local storage
      localStorage.setItem(TOKEN_LS_NAME, obj.token);
      state.token = obj.token;
      state.mustChangePass = false;
      state.pending = false;
      state.errorMessage = null;
      state.tokenShowExpirationWarning = false;
    },
    loginMustChangePass(state, obj) {
      state.mustChangePass = true;
      state.token = obj.token;
      state.pending = false;
      state.errorMessage = null;
      state.tokenShowExpirationWarning = false;
    },
    loginFailed(state, msg) {
      localStorage.removeItem(TOKEN_LS_NAME);
      state.token = null;
      state.pending = false;
      state.errorMessage = msg;
    },
    loggedOut(state) {
      localStorage.removeItem(TOKEN_LS_NAME);
    },
    tokenExpired(state) {
      localStorage.removeItem(TOKEN_LS_NAME);
      state.token = null;
      state.pending = false;
      state.errorMessage = null;
    },
    authWatchToken(state) {
      let payload = parseTokenPayload(state.token);
      state.tokenRemainingSeconds = payload.exp - new Date().getTime()/1000;
      // console.log(`remaining session time: ${state.tokenRemainingSeconds}s`);
      if (state.tokenRemainingSeconds <= 0) {
        this.dispatch('auth/logout');
      } else if (state.tokenRemainingSeconds < state.tokenWarnThreshold) {
        state.tokenShowExpirationWarning = true;
        // switch to a tight 1-second loop once we're in the warning period
        setTimeout(() => {
          this.dispatch('auth/authWatchToken');
        }, 1000);
      } else {
        // default loop, use tokenWatchInterval to repeat
        setTimeout(() => {
          this.dispatch('auth/authWatchToken');
        }, state.tokenWatchInterval);
      }
    },
  },
};
