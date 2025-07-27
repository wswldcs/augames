<template>
  <div id="app" class="min-h-screen">
    <!-- 导航栏 -->
    <Navbar />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <!-- 路由视图 -->
      <router-view />
    </main>

    <!-- 全局错误提示 -->
    <div v-if="gameStore.error" class="fixed bottom-4 right-4 z-50">
      <div class="bg-red-900/90 backdrop-blur-sm border border-red-500/50 rounded-lg p-4 max-w-sm shadow-xl">
        <div class="flex items-start space-x-3">
          <svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div class="flex-1">
            <h4 class="text-red-300 font-medium text-sm">错误</h4>
            <p class="text-red-200 text-sm mt-1">{{ gameStore.error }}</p>
          </div>
          <button
            @click="gameStore.clearError()"
            class="text-red-300 hover:text-red-200 transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 加载指示器 -->
    <div v-if="gameStore.loading" class="fixed top-4 right-4 z-50">
      <div class="bg-black/80 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-3">
        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span class="text-white text-sm">加载中...</span>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="返回顶部"
      >
        <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from './store'
import Navbar from './components/Navbar.vue'

const gameStore = useGameStore()

// 响应式数据
const showBackToTop = ref(false)

// 方法

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// 生命周期
onMounted(() => {
  // 监听滚动事件
  window.addEventListener('scroll', handleScroll)
  
  // 设置页面基本信息
  document.title = 'Web Game Hub - 网页游戏中心'
  
  // 添加页面元数据
  const metaDescription = document.createElement('meta')
  metaDescription.name = 'description'
  metaDescription.content = '免费的网页游戏平台，收录经典HTML5游戏和模拟器游戏，无需下载即可畅玩'
  document.head.appendChild(metaDescription)
  
  const metaKeywords = document.createElement('meta')
  metaKeywords.name = 'keywords'
  metaKeywords.content = '网页游戏,HTML5游戏,在线游戏,免费游戏,经典游戏,模拟器'
  document.head.appendChild(metaKeywords)
  
  // 添加 viewport meta 标签确保移动端适配
  const viewport = document.querySelector('meta[name="viewport"]')
  if (!viewport) {
    const metaViewport = document.createElement('meta')
    metaViewport.name = 'viewport'
    metaViewport.content = 'width=device-width, initial-scale=1.0'
    document.head.appendChild(metaViewport)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* 全局样式 */
#app {
  @apply flex flex-col min-h-screen;
}

/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-slate-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-500;
}

/* 选择文本样式 */
::selection {
  @apply bg-purple-600/50 text-white;
}

/* 焦点样式 */
*:focus {
  outline: none;
}

*:focus-visible {
  @apply ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900;
}

/* 禁用文本选择的元素 */
button,
.navbar,
.game-card {
  user-select: none;
}

/* 图片加载优化 */
img {
  @apply max-w-full h-auto;
}

/* 链接样式 */
a {
  @apply transition-colors duration-200;
}

/* 表单元素样式 */
input,
select,
textarea {
  @apply transition-all duration-200;
}

input:focus,
select:focus,
textarea:focus {
  @apply ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900;
}

/* 按钮禁用状态 */
button:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* 响应式字体大小 */
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  html {
    font-size: 16px;
  }
}

/* 打印样式 */
@media print {
  .navbar,
  .fixed,
  button {
    display: none !important;
  }
  
  body {
    background: white !important;
    color: black !important;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .bg-white\/10 {
    @apply bg-white/20;
  }
  
  .text-white\/60 {
    @apply text-white/80;
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
