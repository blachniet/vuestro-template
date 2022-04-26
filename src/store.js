/* global Vue, Vuex */
import settings from '@/components/settings/store';
import auth from '@/components/auth/store';
import example from '@/components/example/store';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    settings,
    auth,
    example,
  },
  strict: debug,
  plugins: debug ? [] : []
});