import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../pages/Dashboard.vue';
import UsersView from '../pages/Users.vue';
// import ProjectsView from '../pages/ProjectsView.vue';
// import CalendarView from '../pages/CalendarView.vue';
// import ReportsView from '../pages/ReportsView.vue';
// import SettingsView from '../pages/SettingsView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    meta: { icon: 'home' },
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
    meta: { icon: 'users' },
  },
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   component: ProjectsView,
  //   meta: { icon: 'folder' },
  // },
  // {
  //   path: '/calendar',
  //   name: 'Calendar',
  //   component: CalendarView,
  //   meta: { icon: 'calendar' },
  // },
  // {
  //   path: '/reports',
  //   name: 'Reports',
  //   component: ReportsView,
  //   meta: { icon: 'chart' },
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: SettingsView,
  //   meta: { icon: 'settings' },
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
