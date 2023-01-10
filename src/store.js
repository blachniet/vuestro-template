/* global Vue, Vuex */
import auth from '@/components/framework/auth';
import roles from '@/components/framework/roles';
import profile from '@/components/framework/profile';
import admin from '@/components/admin/store';
import settings from '@/components/settings/store';
import example from '@/components/example/store';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    roles,
    profile,
    admin,
    settings,
    example,
  },
  strict: debug,
  plugins: debug ? [] : []
});