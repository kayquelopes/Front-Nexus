import { createRouter, createWebHistory } from 'vue-router'
import cadHqsView from '../views/cadHqsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cadHqsView',
      component: cadHqsView,
    },
    {
      path: '/confirm',
      name: 'confirmHqs',
      component: () => import('../views/confirmHqsView.vue'),
    },
  ],
})

export default router
