import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Download from '../view/download/Download.vue'

import Home from '../view/home/Home.vue'

import NotFound from '../view/notFound/NotFound.vue'

declare module 'vue-router' {
  interface RouteMeta {
    headerMenuName?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      headerMenuName: '首页'
    }
  },
  {
    path: '/download',
    component: Download,
    name: 'download',
    meta: {
      headerMenuName: '下载'
    }
  },
  
  {
    path: '/:pathMatch(.*)*',    
    component:NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
