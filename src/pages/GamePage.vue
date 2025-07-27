<template>
  <div class="min-h-screen">
    <!-- 加载状态 -->
    <div v-if="gameStore.loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white/60">正在加载游戏...</p>
      </div>
    </div>

    <!-- 游戏未找到 -->
    <div v-else-if="!currentGame" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md">
        <svg class="w-16 h-16 text-white/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <h1 class="text-2xl font-bold text-white mb-2">游戏未找到</h1>
        <p class="text-white/60 mb-6">抱歉，您要查找的游戏不存在或已被移除。</p>
        <div class="space-x-3">
          <router-link to="/" class="btn-primary">
            返回首页
          </router-link>
          <button @click="$router.go(-1)" class="btn-secondary">
            返回上页
          </button>
        </div>
      </div>
    </div>

    <!-- 游戏内容 -->
    <div v-else class="container mx-auto max-w-7xl px-4 py-6">
      <!-- 面包屑导航 -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <router-link to="/" class="text-white/60 hover:text-white transition-colors duration-200">
              首页
            </router-link>
          </li>
          <li class="text-white/40">/</li>
          <li>
            <span class="text-white/60">游戏</span>
          </li>
          <li class="text-white/40">/</li>
          <li class="text-white font-medium">{{ currentGame.title }}</li>
        </ol>
      </nav>

      <!-- 游戏播放器 -->
      <div class="mb-8">
        <GamePlayer :game="currentGame" />
      </div>

      <!-- 相关游戏推荐 -->
      <section v-if="relatedGames.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-white mb-6">
          🎯 相关游戏推荐
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <GameCard
            v-for="game in relatedGames"
            :key="game.id"
            :game="game"
            class="animate-slide-up"
          />
        </div>
      </section>

      <!-- 游戏评论区域 (未来功能) -->
      <section class="mt-12">
        <div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 class="text-xl font-bold text-white mb-4">💬 游戏评论</h3>
          <div class="text-center py-8">
            <svg class="w-12 h-12 text-white/40 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <p class="text-white/60 mb-2">评论功能即将上线</p>
            <p class="text-white/40 text-sm">敬请期待与其他玩家分享游戏心得</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '../store'
import GamePlayer from '../components/GamePlayer.vue'
import GameCard from '../components/GameCard.vue'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()

// Props
const props = defineProps({
  gameId: {
    type: String,
    required: true
  }
})

// 响应式数据
const currentGame = ref(null)

// 计算属性
const relatedGames = computed(() => {
  if (!currentGame.value) return []
  
  // 找到相同类型或相同标签的游戏
  const related = gameStore.games.filter(game => {
    if (game.id === currentGame.value.id) return false
    
    // 相同类型的游戏
    if (game.type === currentGame.value.type) return true
    
    // 有相同标签的游戏
    const hasCommonTag = game.tags.some(tag => 
      currentGame.value.tags.includes(tag)
    )
    return hasCommonTag
  })
  
  // 随机排序并限制数量
  return related.sort(() => Math.random() - 0.5).slice(0, 4)
})

// 方法
const loadGame = async () => {
  const gameId = props.gameId || route.params.gameId
  
  if (!gameId) {
    router.push('/')
    return
  }

  // 如果游戏列表还没加载，先加载
  if (gameStore.games.length === 0) {
    await gameStore.fetchGames()
  }

  // 查找游戏
  const game = gameStore.getGameById(gameId)
  if (game) {
    currentGame.value = game
    gameStore.setCurrentGame(gameId)
    
    // 更新页面标题
    document.title = `${game.title} - Web Game Hub`
  } else {
    currentGame.value = null
    console.error(`Game with id "${gameId}" not found`)
  }
}

// 监听路由变化
watch(() => route.params.gameId, (newGameId) => {
  if (newGameId) {
    loadGame()
  }
}, { immediate: true })

// 监听 props 变化
watch(() => props.gameId, (newGameId) => {
  if (newGameId) {
    loadGame()
  }
}, { immediate: true })

// 组件挂载
onMounted(() => {
  loadGame()
})
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* 面包屑导航样式 */
nav ol li:not(:last-child) {
  @apply flex items-center;
}

nav ol li:not(:last-child)::after {
  content: '';
  @apply ml-2;
}
</style>
