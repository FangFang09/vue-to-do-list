import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'myTasks',
      component: () => import('../views/MyTasksView.vue'),
    },
    {
      path: '/in-progress',
      name: 'inProgress',
      component: () => import('../views/InProgressView.vue'),
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('../views/CompletedView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
