import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/loginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginView,
    },
    {
      path: '/cadastroUser',
      name: 'cadastroView',
      component: () => import('../views/cadastroView.vue'),
    },
    {
      path: '/pagInicial',
      name: 'pagInicial',
      component: () => import('../views/pagInicialView.vue'),
    },
    {
      path: '/cadastroHqs',
      name: 'cadastroHqs',
      component: () => import('../views/cadastroHqsView.vue'),
    },
    {
      path: '/confirm',
      name: 'confirmHqs',
      component: () => import('../views/confirmHqsView.vue'),
    },
    {
      path: '/hq/:id',
      name: 'hqDetalhe',
      component: () => import('../components/HQPage.vue'),
    },
  ],
})

export default router
