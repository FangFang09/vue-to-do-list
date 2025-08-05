import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/supabase.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'loginView',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/my-tasks',
      name: 'myTasks',
      component: () => import('../views/MyTasksView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/in-progress',
      name: 'inProgress',
      component: () => import('../views/InProgressView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('../views/CompletedView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  // 返回錯誤，視為未登入
  if (error) {
    console.error('Auth session error:', error)
    if (to.meta.requiresAuth) {
      return { name: 'loginView' }
    }
    return true
  }

  // 未登入
  if (to.meta.requiresAuth && !session) {
    return { name: 'loginView' }
  }

  // 已登入
  if (to.name === 'loginView' && session) {
    return { name: 'myTasks' }
  }

  return true
})

export default router
