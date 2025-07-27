import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GamePage from '../pages/GamePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Web Game Hub - 网页游戏中心'
    }
  },
  {
    path: '/play/:gameId',
    name: 'Game',
    component: GamePage,
    meta: {
      title: '游戏中 - Web Game Hub'
    },
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/AboutPage.vue'),
    meta: {
      title: '关于我们 - Web Game Hub'
    }
  },
  {
    // 404 页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFoundPage.vue'),
    meta: {
      title: '页面未找到 - Web Game Hub'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，返回到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // 否则滚动到顶部
    return { top: 0 }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  // 更新页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  next()
})

export default router
