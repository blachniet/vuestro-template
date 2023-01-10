import List from '@/components/example/List';
import Table from '@/components/example/Table';
import Dropdown from '@/components/example/Dropdown';

export default {
  meta: {
    title: 'Example',
    sidebar: true,
    icon: 'list',
  },
  name: 'example',
  path: '/example',
  component: { // simple wrapper for the child-routes, uses keep-alive to keep component state
    template: '<keep-alive><router-view :key="$route.path"/></keep-alive>',
  },
  children: [
    {
      meta: {
        title: 'List',
        sidebar: true,
        icon: 'list',
      },
      name: 'list',
      path: 'list',
      component: List,
    },
    {
      meta: {
        title: 'Table',
        sidebar: true,
        icon: 'table',
      },
      name: 'table',
      path: 'table',
      component: Table,
    },
    {
      meta: {
        title: 'Dropdown',
        sidebar: true,
        icon: 'menu',
      },
      name: 'dropdown',
      path: 'dropdown',
      component: Dropdown,
    },
  ],
};