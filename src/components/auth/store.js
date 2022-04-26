//
// JWT-based auth module
//
/* global atob, localStorage, moment, axios */

const TOKEN_LS_NAME = 'token';
const LOGIN_URL = `/api/v1/auth/login`;
const RESET_URL = `/api/v1/auth/reset`;
const LOGOUT_URL = `/api/v1/auth/logout`;

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
    let payload = parseTokenPayload(token.split('Bearer ')[1]);
    if (payload) {
      tokenValid = moment.unix(payload.exp).isAfter(moment().add(1, 'hour'));
    }
  }
  return tokenValid;
};

// the Vuex module
export default {
  state: {
    fullname: null,
    token: localStorage.getItem(TOKEN_LS_NAME),
    pending: false,
    mustChangePass: false,
    errorMessage: null,
  },
  getters: {
    isLoggedIn: (state) => {
      return !state.mustChangePass && isTokenValid(state.token);
    },
    isLoggingIn: (state) => {
      return state.pending;
    },
    authErrorMessage: (state) => {
      return state.errorMessage;
    },
    token: (state) => {
      return state.token;
    },
    rawToken: (state) => {
      return state.token.split('Bearer ')[1];
    },
    username: (state) => {
      return parseUsername(state.token);
    },
    mustChangePass: (state) => {
      return state.mustChangePass;
    },
  },
  actions: {
    login({ commit }, creds) {
      commit('loggingIn'); // so UI can show spinner
      // post the login
      return axios.post(LOGIN_URL, {
        username: creds.username,
        password: creds.password,
      }).then((res) => {
        if (res.data.mustChangePass) {
          return commit('loginMustChangePass', res.data);
        }
        // else get
        commit('loginSuccess', res.data);
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
    changePassword({ commit }, creds) {
      return axios.post(RESET_URL, {
        username: creds.username,
        password: creds.password,
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
      });
    },
    checkAuthForHTTPError({ commit }, err) {
      if (err.response && err.response.status === 401) {
        commit('tokenExpired');
      }
    },
  },
  mutations: {
    loggingIn(state) {
      state.pending = true;
      state.errorMessage = null;
    },
    loginSuccess(state, token) {
      // save to browser local storage
      localStorage.setItem(TOKEN_LS_NAME, token);
      state.token = token;
      state.mustChangePass = false;
      state.pending = false;
      state.errorMessage = null;
    },
    loginMustChangePass(state, obj) {
      state.mustChangePass = true;
      state.token = obj.token;
      state.pending = false;
      state.errorMessage = null;
    },
    loginFailed(state, msg) {
      localStorage.removeItem(TOKEN_LS_NAME);
      state.token = null;
      state.pending = false;
      state.errorMessage = msg;
    },
    loggedOut(state) {
      localStorage.removeItem(TOKEN_LS_NAME);
      window.location.replace('/');
    },
    tokenExpired(state) {
      localStorage.removeItem(TOKEN_LS_NAME);
      state.token = null;
      state.pending = false;
      state.errorMessage = null;
    },
  },
};
