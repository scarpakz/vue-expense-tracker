import { createRouter, createWebHistory } from 'vue-router';

// import components
import DashboardView from '@/views/DashboardView.vue';
import AccountView from '@/views/AccountView.vue';
import TransactionsView from '@/views/TransactionsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

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
        {
            path: '/transactions',
            name: 'transactions',
            component: TransactionsView
        },
        {
            path: "/:catchAll(.*)",
            name: "not-found",
            component: NotFoundView
        }
    ]
})

export default router