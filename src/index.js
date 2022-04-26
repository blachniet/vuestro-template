/* global Vue */

import Vuestro from 'vuestro';
Vue.use(Vuestro);

import App from '@/App';
import store from '@/store';
import router from '@/router';

// disable production tip
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
