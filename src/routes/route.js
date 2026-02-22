import { createRouter, createWebHistory } from 'vue-router';

// import components
import DashboardView from '@/views/DashboardView.vue';
import AccountView from '@/views/AccountView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: DashboardView
        },
        {
            path: '/account',
            name: 'account',
            component: AccountView
        },
    ]
})

export default router