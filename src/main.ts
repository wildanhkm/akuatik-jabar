import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Material from '@primeuix/themes/material';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
      darkModeSelector: false,
    },
  },
});
app.use(ToastService);

app.mount('#app');
