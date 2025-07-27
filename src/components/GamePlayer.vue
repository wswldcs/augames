<template>
  <div class="game-player-container">
    <!-- 游戏标题栏 -->
    <div class="flex items-center justify-between p-4 border-b border-white/10">
      <div class="flex items-center space-x-3">
        <button
          @click="$router.go(-1)"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          title="返回"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        <div>
          <h1 class="text-xl font-bold text-white">{{ game?.title }}</h1>
          <p class="text-sm text-white/60">{{ getTypeLabel(game?.type) }}</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <!-- 全屏按钮 -->
        <button
          @click="toggleFullscreen"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          :title="isFullscreen ? '退出全屏' : '全屏'"
        >
          <svg v-if="!isFullscreen" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9.414l1.293 1.293a1 1 0 11-1.414 1.414L8 5.414V7a1 1 0 01-2 0V3zm4 8a1 1 0 011 1v2.586l1.293-1.293a1 1 0 111.414 1.414L13.414 16H15a1 1 0 110 2h-4a1 1 0 01-1-1v-4a1 1 0 011-1zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-2.586l-1.293 1.293a1 1 0 11-1.414-1.414L2.586 12H1a1 1 0 110-2h2z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        <!-- 重新加载按钮 -->
        <button
          @click="reloadGame"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          title="重新加载"
          :disabled="loading"
        >
          <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 游戏区域 -->
    <div class="relative" :class="{ 'fullscreen-game': isFullscreen }">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center h-96 bg-black/20">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white/60">正在加载游戏...</p>
          <p class="text-white/40 text-sm mt-2">优化加载中，请稍候</p>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="flex items-center justify-center h-96 bg-red-900/20">
        <div class="text-center">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <p class="text-red-400 mb-2">游戏加载失败</p>
          <p class="text-white/60 text-sm mb-4">{{ error }}</p>
          <div class="space-x-2">
            <button @click="reloadGame" class="btn-primary">
              重试
            </button>
            <button @click="testDirectAccess" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              直接访问
            </button>
          </div>
        </div>
      </div>

      <!-- HTML5 游戏 -->
      <div v-else-if="game?.type === 'html5'" class="relative">
        <!-- 直接链接方式 -->
        <div v-if="useDirectLink" class="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <div class="text-white text-6xl mb-4">🎮</div>
            <p class="text-white mb-4">点击下方按钮在新窗口中游玩</p>
            <a
              :href="game.path"
              target="_blank"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              开始游戏
            </a>
          </div>
        </div>

        <!-- iframe方式 -->
        <iframe
          v-else
          ref="gameFrame"
          :src="game.path"
          class="w-full h-96 border-0 rounded-lg"
          :class="{ 'fullscreen-iframe': isFullscreen }"
          :style="{ opacity: loading ? 0.3 : 1, transition: 'opacity 0.3s' }"
          @load="handleGameLoad"
          @error="handleGameError"
          allowfullscreen
          frameborder="0"
          scrolling="no"
        ></iframe>

        <!-- 切换按钮 -->
        <div class="absolute top-2 right-2">
          <button
            @click="toggleDisplayMode"
            class="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            {{ useDirectLink ? '尝试嵌入' : '新窗口打开' }}
          </button>
        </div>
      </div>

      <!-- NES 游戏 -->
      <div
        v-else-if="game?.type === 'nes'"
        ref="nesContainer"
        class="w-full h-96 bg-black flex items-center justify-center"
        :class="{ 'fullscreen-nes': isFullscreen }"
      >
        <canvas ref="nesCanvas" class="max-w-full max-h-full"></canvas>
      </div>

      <!-- 其他类型游戏的占位符 -->
      <div v-else class="flex items-center justify-center h-96 bg-yellow-900/20">
        <div class="text-center">
          <svg class="w-12 h-12 text-yellow-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <p class="text-yellow-400 mb-2">暂不支持此游戏类型</p>
          <p class="text-white/60 text-sm">{{ game?.type?.toUpperCase() }} 类型游戏支持正在开发中</p>
        </div>
      </div>
    </div>

    <!-- 游戏信息和控制说明 -->
    <div v-if="!isFullscreen" class="p-4 border-t border-white/10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 游戏描述 -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">游戏介绍</h3>
          <p class="text-white/70 leading-relaxed">{{ game?.description }}</p>
          
          <div class="mt-4">
            <h4 class="text-sm font-medium text-white/80 mb-2">游戏标签</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in game?.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 控制说明 -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">操作说明</h3>
          <div class="space-y-2">
            <div
              v-for="control in game?.controls"
              :key="control.key"
              class="flex items-center justify-between p-2 bg-white/5 rounded-lg"
            >
              <span class="text-white/80 font-mono text-sm">{{ control.key }}</span>
              <span class="text-white/60 text-sm">{{ control.action }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

// Props
const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

// 响应式数据
const loading = ref(true)
const error = ref(null)
const isFullscreen = ref(false)
const gameFrame = ref(null)
const nesContainer = ref(null)
const nesCanvas = ref(null)
const useDirectLink = ref(true) // 默认使用新窗口模式

let loadingTimeout = null

// 监听iframe消息
const handleMessage = (event) => {
  console.log('Received message from iframe:', event.data)
  if (event.data === 'game-loaded') {
    handleGameLoad()
  }
}

// 添加消息监听器
if (typeof window !== 'undefined') {
  window.addEventListener('message', handleMessage)
}

// 方法
const getTypeLabel = (type) => {
  const labels = {
    'html5': 'HTML5 游戏',
    'nes': 'NES 模拟器',
    'dos': 'DOS 模拟器',
    'gba': 'GBA 模拟器',
    'snes': 'SNES 模拟器'
  }
  return labels[type] || type?.toUpperCase()
}

const handleGameLoad = () => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
    loadingTimeout = null
  }
  loading.value = false
  error.value = null
  console.log('Game loaded successfully:', props.game?.path)

  // 检查iframe内容是否真的加载了
  setTimeout(() => {
    try {
      const iframe = gameFrame.value
      if (iframe && iframe.contentDocument) {
        console.log('Iframe content loaded:', iframe.contentDocument.title)
      } else {
        console.log('Iframe content not accessible (CORS or other security restriction)')
      }
    } catch (e) {
      console.log('Cannot access iframe content:', e.message)
    }
  }, 1000)
}



const handleGameError = (event) => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
    loadingTimeout = null
  }
  loading.value = false
  console.error('Game loading error:', event)
  console.error('Game path:', props.game?.path)
  error.value = `游戏加载失败: ${props.game?.path || '未知路径'}`
}

const startLoadingTimeout = () => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout)
  }
  loadingTimeout = setTimeout(() => {
    if (loading.value) {
      loading.value = false
      error.value = '游戏加载超时，请重试'
    }
  }, 5000) // 5秒超时
}

const reloadGame = () => {
  loading.value = true
  error.value = null

  if (props.game?.type === 'html5' && gameFrame.value) {
    gameFrame.value.src = gameFrame.value.src
  } else if (props.game?.type === 'nes') {
    loadNESGame()
  }
}

const testDirectAccess = () => {
  if (props.game?.path) {
    const fullUrl = `${window.location.origin}${props.game.path}`
    console.log('Testing direct access to:', fullUrl)
    window.open(fullUrl, '_blank')
  }
}

const toggleDisplayMode = () => {
  useDirectLink.value = !useDirectLink.value
  if (!useDirectLink.value) {
    // 切换回iframe模式时重新加载
    loading.value = true
    error.value = null
  }
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const loadNESGame = async () => {
  try {
    // 这里应该加载 NES 模拟器库
    // 由于这是一个演示，我们暂时显示一个占位符
    console.log('Loading NES game:', props.game.path)
    
    // 模拟加载时间
    setTimeout(() => {
      loading.value = false
      // 这里应该初始化 NES 模拟器
    }, 2000)
    
  } catch (err) {
    error.value = `NES 游戏加载失败: ${err.message}`
    loading.value = false
  }
}

// 监听游戏变化
watch(() => props.game, (newGame) => {
  if (newGame) {
    console.log('Loading game:', newGame)
    console.log('Game path:', newGame.path)
    console.log('Game type:', newGame.type)

    error.value = null

    if (newGame.type === 'nes') {
      loading.value = true
      loadNESGame()
    } else if (newGame.type === 'html5') {
      if (useDirectLink.value) {
        // 新窗口模式不需要loading
        loading.value = false
      } else {
        // iframe模式需要loading
        loading.value = true
        startLoadingTimeout()
      }
    } else {
      // 其他类型的游戏直接设置为加载完成
      loading.value = false
    }
  }
}, { immediate: true })

// 组件挂载和卸载
onMounted(() => {
  // 监听 ESC 键退出全屏
  const handleKeydown = (event) => {
    if (event.key === 'Escape' && isFullscreen.value) {
      toggleFullscreen()
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  // 清理函数
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''

    // 清理游戏加载相关的资源
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleMessage)
    }
  })
})
</script>

<style scoped>


.fullscreen-game {
  @apply fixed inset-0 z-50 bg-black;
}

.fullscreen-iframe {
  @apply w-screen h-screen;
}

.fullscreen-nes {
  @apply w-screen h-screen;
}

/* 确保全屏时的样式 */
.fullscreen-game .game-player-container {
  @apply h-screen flex flex-col;
}

.fullscreen-game iframe,
.fullscreen-game canvas {
  @apply flex-1;
}
</style>
