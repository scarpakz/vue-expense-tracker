import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { PRIME } from '@/primeImports.js';

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
            preset: Aura,
            options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    },
});

app.component('InputText', PRIME.InputText)
app.component('Button', PRIME.Button)

app.mount('#app')