import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../pages/Dashboard.vue';
import LoginView from '../pages/Login.vue';
import UsersView from '../pages/Users.vue';

import EventsView from '../pages/events/Index.vue';
import EditEventView from '../pages/events/EditEvent.vue';
import CreateEventView from '../pages/events/CreateEvent.vue';

import RegisterView from '../pages/Register.vue';
import KejurkabRegister from '../pages/public/KejurkabRegister.vue';
import PublicLayout from '../layouts/PublicLayout.vue';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue';

const routes = [
  {
    path: '/',
    name: '',
    component: AuthenticatedLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true, icon: 'home' },
      },
      {
        path: '/users',
        name: 'User',
        component: UsersView,
        meta: { requiresAuth: true, icon: 'users' },
      },
      {
        path: '/users',
        name: 'Admin',
        component: UsersView,
        meta: { requiresAuth: true, icon: 'users' },
      },
      {
        path: '/events',
        name: 'Event',
        component: EventsView,
        meta: { requiresAuth: true, icon: 'calendar' },
      },
      {
        path: '/events/edit-event/:id',
        name: 'EditEvent',
        component: EditEventView,
        meta: { requiresAuth: true, showInSidebar: false },
      },
      {
        path: '/events/create-event',
        name: 'CreateEvent',
        component: CreateEventView,
        meta: { requiresAuth: true, showInSidebar: false },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/public',
    name: 'Public',
    component: PublicLayout,
    meta: { requiresAuth: false },
    children: [
      {
        path: '/public/kejurkab/register',
        name: 'Public Kejurkab Register',
        component: KejurkabRegister,
        meta: { requiresAuth: false },
      },
    ],
  },
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/public/NotFound.vue'),
    meta: { requiresAuth: false, showInSidebar: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Check for token expiration
  if (token) {
    try {
      // Parse the JWT token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const { exp } = JSON.parse(jsonPayload);

      // If token is expired, remove it and redirect to login
      if (exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (requiresAuth) {
          next('/login');
          return;
        }
      }
    } catch (error) {
      // If token is invalid, remove it
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (requiresAuth) {
        next('/login');
        return;
      }
    }
  }

  // Route guard logic
  if (requiresAuth && !token) {
    // If route requires auth and no token exists, redirect to login
    next('/login');
  } else if (!requiresAuth && token && (to.path === '/login' || to.path === '/register')) {
    // If user is already logged in and tries to access login/register, redirect to dashboard
    next('/dashboard');
  } else {
    // Otherwise proceed as normal
    next();
  }
});

export default router;
