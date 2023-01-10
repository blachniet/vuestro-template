/* global Vue */
import Router from 'vue-router';

import DashboardRoute from '@/components/dashboard/route';
import ExampleRoute from '@/components/example/route';
import SettingsRoute from '@/components/settings/route';
import AdminRoute from '@/components/admin/route';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    DashboardRoute,
    ExampleRoute,
    SettingsRoute,
    AdminRoute,
    { path: '/*', redirect: '/dashboard' } // redirect to dashboard
  ],
});

