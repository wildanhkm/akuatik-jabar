import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../pages/Dashboard.vue';
import LoginView from '../pages/Login.vue';
import UsersView from '../pages/Users.vue';
import EventsView from '../pages/Events.vue';
import StartingListView from '../pages/StartingList.vue';
import RegisterView from '../pages/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/dashboard',
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
  {
    path: '/events',
    name: 'Events',
    component: EventsView,
    meta: { icon: 'calendar' },
  },
  {
    path: '/starting-list',
    name: 'StartingList',
    component: StartingListView,
    meta: { icon: 'chart' },
  },
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
