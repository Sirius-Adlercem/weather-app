import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import i18n from './i18n'; // Импортируем i18n

// Импортируем стили Quasar
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  config: {
    dark: true, 
  },
});

app.use(i18n);
app.mount('#app');