import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../pages/Dashboard.vue';
import LoginView from '../pages/Login.vue';
import UsersView from '../pages/Users.vue';
import EventsView from '../pages/Events.vue';
import StartingListView from '../pages/StartingList.vue';
import RegisterView from '../pages/Register.vue';
import KejurkabRegister from '../pages/public/KejurkabRegister.vue';
import PublicLayout from '../layouts/PublicLayout.vue';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';

// const isAuthenticated = false;

const routes = [
  {
    path: '/',
    name: '',
    component: AuthenticatedLayout,
    children: [
      {
        path: '/login',
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
        name: 'Starting List',
        component: StartingListView,
        meta: { icon: 'chart' },
      },
    ],
  },
  {
    path: '/public',
    name: 'Public',
    component: PublicLayout,
    children: [
      {
        path: '/public/kejurkab/register',
        name: 'Public Kejurkab Register',
        component: KejurkabRegister,
      },
    ],
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

// router.beforeEach((to, _, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
//   else next();
// });

export default router;
