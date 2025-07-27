<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center max-w-md px-4">
      <!-- 404 动画图标 -->
      <div class="mb-8">
        <div class="relative">
          <div class="text-8xl font-bold text-white/20 animate-pulse">404</div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-16 h-16 text-purple-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 错误信息 -->
      <h1 class="text-3xl font-bold text-white mb-4">页面未找到</h1>
      <p class="text-white/70 mb-8 leading-relaxed">
        抱歉，您访问的页面不存在或已被移除。
        <br>
        可能是链接错误或页面已经迁移到新的位置。
      </p>

      <!-- 操作按钮 -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <router-link to="/" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            返回首页
          </router-link>
          
          <button @click="$router.go(-1)" class="btn-secondary">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            返回上页
          </button>
        </div>

        <!-- 搜索建议 -->
        <div class="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
          <h3 class="text-lg font-semibold text-white mb-3">🔍 您可能在寻找：</h3>
          <div class="grid grid-cols-1 gap-2">
            <router-link 
              to="/" 
              class="text-left p-2 bg-white/5 hover:bg-white/10 rounded transition-colors duration-200 text-white/80 hover:text-white"
            >
              <div class="font-medium">游戏大厅</div>
              <div class="text-sm text-white/60">浏览所有可用的游戏</div>
            </router-link>
            
            <router-link 
              to="/about" 
              class="text-left p-2 bg-white/5 hover:bg-white/10 rounded transition-colors duration-200 text-white/80 hover:text-white"
            >
              <div class="font-medium">关于我们</div>
              <div class="text-sm text-white/60">了解 Web Game Hub 项目</div>
            </router-link>
          </div>
        </div>

        <!-- 报告问题 -->
        <div class="mt-6 text-sm text-white/60">
          如果您认为这是一个错误，请
          <a href="https://github.com" class="text-purple-400 hover:text-purple-300 underline">
            报告问题
          </a>
        </div>
      </div>

      <!-- 装饰元素 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-green-500/10 rounded-full animate-float" style="animation-delay: 4s;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '页面未找到 - Web Game Hub'
})
</script>

<style scoped>
/* 浮动动画 */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-10px); 
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .text-8xl {
    @apply text-6xl;
  }
}
</style>
