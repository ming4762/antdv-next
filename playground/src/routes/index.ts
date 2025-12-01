import { createRouter, createWebHistory } from 'vue-router'
import componentRoutes from '@/routes/components'
import demoRoutes from '@/routes/demos'
import { pagesRoutes } from '@/routes/pages'

export const router = createRouter({
  routes: [
    ...componentRoutes,
    ...pagesRoutes,
    ...demoRoutes,
  ],
  history: createWebHistory(),
})
