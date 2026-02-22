import './assets/style.css'

import 'primeicons/primeicons.css'
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import router from './routes/route';

const app = createApp(App)

const options = {
    timeout: 3000,
    position: "top-right",
};

app.use(router)
app.use(Toast, options);

app.mount('#app')