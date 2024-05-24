import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/dashboard'},
        {
            path: '/',
            component: () => import('../layouts/default.vue'),
            children: [
                {
                    path: 'co2',
                    component: () => import('../pages/dashboard.vue'),
                },
                {
                    path: 'energy',
                    component: () => import('../pages/dashboard.vue'),
                },
                {
                    path: 'temperature',
                    component: () => import('../pages/dashboard.vue'),
                },
                {
                    path: 'dashboard',
                    component: () => import('../pages/dashboard.vue'),
                },
                {
                    path: 'humidity',
                    component: () => import('../pages/humidity.vue'),
                },
                {
                    path: 'account-settings',
                    component: () => import('../pages/account-settings.vue'),
                },
            ],
        },
        {
            path: '/',
            component: () => import('../layouts/blank.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../pages/login.vue'),
                },
                {
                    path: 'register',
                    component: () => import('../pages/register.vue'),
                },
                {
                    path: '/:pathMatch(.*)*',
                    component: () => import('../pages/[...all].vue'),
                },
            ],
        },
    ],
})

export default router
