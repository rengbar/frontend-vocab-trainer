import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { store } from './store.js';
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.css'; // Import your CSS after bootstrap

window.bootstrap = Bootstrap;

const app = createApp(App);

app.use(router);

app.mount('#app');
