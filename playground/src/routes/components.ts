// 文档分了中文文档和英文文档的加载
import type { RouteRecordRaw } from 'vue-router'

const cnDocs = import.meta.glob('/src/pages/components/*/index.zh-CN.md', { eager: true, import: 'default' })
const enDocs = import.meta.glob('/src/pages/components/*/index.en-US.md', { eager: true, import: 'default' })
export function generateDocRoutes() {
  const routes: RouteRecordRaw[] = []
  // 处理中文文档
  for (const path in enDocs) {
    // 去掉路径和后缀，得到请求的路由
    const routePath = path.replace('/index.en-US.md', '').replace('/src/pages', '').toLowerCase()
    routes.push({
      path: routePath,
      component: enDocs[path] as any,
    })
    const cnPath = path.replace('index.en-US.md', 'index.zh-CN.md')
    if (cnDocs[cnPath]) {
      routes.push({
        path: `${routePath}-cn`,
        component: cnDocs[cnPath] as any,
      })
    }
  }
  return routes
}

export default [
  {
    path: '/components',
    component: () => import('@/layouts/docs/index.vue'),
    children: generateDocRoutes(),
  },
] as RouteRecordRaw[]
