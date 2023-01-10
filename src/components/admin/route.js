import AdminUsers from '@/components/admin/AdminUsers';
import AdminRoles from '@/components/admin/AdminRoles';

export default {
  meta: {
    title: 'Admin',
    sidebar: true,
    icon: 'user',
    role: ['manageUsers',
           'manageRoles',],
  },
  name: 'admin',
  path: '/admin',
  component: { // simple wrapper for the child-routes, uses keep-alive to keep component state
    template: '<keep-alive><router-view :key="$route.path"/></keep-alive>',
  },
  children: [
    {
      meta: {
        title: 'Users',
        sidebar: true,
        role: 'manageUsers',
      },
      name: 'admin-users',
      path: 'users',
      component: AdminUsers,
    },
    {
      meta: {
        title: 'Roles',
        sidebar: true,
        role: 'manageRoles',
      },
      name: 'admin-roles',
      path: 'roles',
      component: AdminRoles,
    },
  ],
};