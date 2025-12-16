import type { RouteRecordRaw } from 'vue-router'

export const pagesRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/icons',
    component: () => import('@/pages/components/icons/index.vue'),
  },
  {
    path: '/components',
    component: () => import('@/layouts/docs/index.vue'),
    children: [

    ],
  },
]
