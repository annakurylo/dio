import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/humidity' },
    {
      path: '/',
      component: () => import('@layouts/default.vue'),
      children: [
        {
          path: 'co2',
          component: () => import('../pages/CarboneDioxide.vue'),
        },
        {
          path: 'ionization',
          component: () => import('../pages/ionization.vue'),
        },
        {
          path: 'temperature',
          component: () => import('../pages/Temperature.vue'),
        },
        {
          path: 'water',
          component: () => import('../pages/WaterQuality.vue'),
        },
        {
          path: 'humidity',
          component: () => import('../pages/humidity.vue'),
        },
        {
          path: 'dust',
          component: () => import('../pages/Dust.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@layouts/blank.vue'),
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
