<template>
  <div class="login-page">
    <div class="middle-box animated fadeInDown">
      <div class="logo">
        <img :src="logo"/>
        PUT YOUR LOGO HERE
      </div>
      <div v-if="mustChangePass || ($route.params.op === 'reset' && $route.params.link)">
        <form>
          <div>Please change your password:</div>
          <vuestro-text-field type="password" size="lg"
                              placeholder="New Password"
                              :validate="passwordMatch"
                              v-model="form.password">
          </vuestro-text-field>
          <vuestro-text-field type="password" size="lg"
                              placeholder="Confirm Password"
                              :validate="passwordMatch"
                              v-model="form.password2">
          </vuestro-text-field>
          <div class="password-mismatch" v-if="passwordMismatch">Passwords don't match</div>
        </form>
        <vuestro-container justify="space-evenly">
          <vuestro-button size="lg" no-border :disabled="!resetValid" variant="success" @click="onReset">Reset Password</vuestro-button>
        </vuestro-container>
      </div>
      <template v-else>
        <!--STANDARD LOGIN-->
        <div>
          <form @keyup.enter="onLogin">
            <div v-if="authErrorMessage" class="error-message">
              {{ authErrorMessage }}
            </div>
            <vuestro-text-field size="lg" placeholder="Username" autocomplete="off" v-model="form.username"></vuestro-text-field>
            <vuestro-text-field type="password" size="lg" placeholder="Password" v-model="form.password"></vuestro-text-field>
          </form>
          <vuestro-container justify="space-evenly">
            <vuestro-button v-if="authErrorMessage === 'Wrong password'"
                            no-border
                            size="lg"
                            variant="danger"
                            @click="onForgot">Forgot?</vuestro-button>
            <vuestro-button size="lg" no-border variant="success" @click="onLogin">Login</vuestro-button>
          </vuestro-container>
        </div>
      </template>
    </div>
    <div class="login-footer">
      <strong>Vuestro</strong>Template {{version}} ©{{ (new Date).getFullYear() }}
    </div>
  </div>
</template>

<script>

/* global Vuex */

export default {
  name: 'Login',
  props: {
    logo: { type: String, default: '' },
    version: { type: String },
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        password2: '',
      },
      showPassword: false,
      passwordMismatch: false,
    };
  },
  computed: {
    ...Vuex.mapGetters('auth', ['isLoggingIn', 'authErrorMessage', 'isRegisterSuccess', 'mustChangePass']),
    loginValid() {
      if (!!this.form.username && !!this.form.password) {
        return true;
      }
    },
    resetValid() {
      return !this.passwordMismatch;
    },
  },
  methods: {
    onLogin() {
      if (this.loginValid) {
        this.$store.dispatch('auth/login', this.form).then(() => {
          this.form.password = '';
          this.form.password2 = '';
        });
      }
    },
    onReset() {
      this.$store.dispatch('auth/changePassword', {
        username: this.form.username,
        password: this.form.password,
      });
      this.$router.push({ path: '/dashboard' }).catch((err) => {err;});
    },
    reset() {
      this.form.username = '';
      this.form.password = '';
      this.form.password2 = '';
    },
    passwordMatch(d) {
      if (!!this.form.password && !!this.form.password2) {
        this.passwordMismatch = this.form.password !== this.form.password2;
      }
    },
  },
};
</script>


<style scoped>

.login-page {
  background-color: #2f353f;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.middle-box {
  padding-top: 1em;
  background-color: #212727;
  display: flex;
  align-items: center;
}

.logo {
  margin: 2em 3em;
}
.logo img {
  width: 200px;
}

/* animation*/
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  -moz-animation-name: fadeInDown;
  animation-name: fadeInDown;
}

.login-footer {
  position: absolute;
  bottom: 5px;
  right: 8px;
  color: #999;
  text-align: right;
}

.vuestro-text-field {
  margin-top: 20px;
  min-width: 15em;
}

.vuestro-text-field >>> input:-internal-autofill-selected {
  background-color: blue !important;
  background-image: none !important;
  color: rgb(0, 0, 0) !important;
}

.message {
  color: var(--vuestro-text-color);
}
.error-message {
  color: var(--vuestro-red);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.password-mismatch {
  color: var(--vuestro-danger);
  font-weight: 700;
  font-size: 0.9em;
  text-align: center;
}

.outage-notice {
  text-align: center;
  margin-bottom: 1em;
  color: red;
  font-size: 2em;
}
</style>