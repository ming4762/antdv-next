import { createRouter, createWebHistory } from 'vue-router'
import componentRoutes from '@/routes/components'
import demoRoutes from '@/routes/demos'
import { pagesRoutes } from '@/routes/pages'

export const router = createRouter({
  routes: [
    ...componentRoutes,
    ...pagesRoutes,
    {
      path: '/~demos',
      redirect: '/~demos/affix-demo-basic',
      component: () => import('@/layouts/demo/index.vue'),
      children: demoRoutes,
    },
  ],
  history: createWebHistory(),
})
