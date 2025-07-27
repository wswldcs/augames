<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 text-center">
      <div class="container mx-auto max-w-4xl">
        <!-- 主标题 -->
        <h1 class="text-5xl md:text-7xl font-bold font-game text-gradient mb-6 animate-fade-in">
          Web Game Hub
        </h1>
        <p class="text-xl md:text-2xl text-white/80 mb-8 animate-slide-up">
          🎮 网页游戏中心 - 在浏览器中畅玩经典游戏
        </p>
        <p class="text-lg text-white/60 mb-12 max-w-2xl mx-auto animate-slide-up">
          无需下载安装，即点即玩。收录了众多经典的HTML5游戏和通过模拟器运行的复古游戏，
          让您重温童年回忆，享受游戏乐趣。
        </p>

        <!-- 快速统计 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div class="stat-card">
            <div class="text-2xl font-bold text-blue-400">{{ gameStore.games.length }}</div>
            <div class="text-sm text-white/60">游戏总数</div>
          </div>
          <div class="stat-card">
            <div class="text-2xl font-bold text-green-400">{{ Object.keys(gameStore.gamesByType).length }}</div>
            <div class="text-sm text-white/60">游戏类型</div>
          </div>
          <div class="stat-card">
            <div class="text-2xl font-bold text-purple-400">{{ gameStore.allTags.length }}</div>
            <div class="text-sm text-white/60">游戏标签</div>
          </div>
          <div class="stat-card">
            <div class="text-2xl font-bold text-yellow-400">100%</div>
            <div class="text-sm text-white/60">免费游玩</div>
          </div>
        </div>
      </div>

      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-purple-500/20 rounded-full animate-float" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-green-500/20 rounded-full animate-float" style="animation-delay: 4s;"></div>
      </div>
    </section>

    <!-- 搜索和筛选区域 -->
    <section class="py-8 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div class="flex-1 w-full md:w-auto">
            <SearchBar />
          </div>
          <button
            @click="showStats = !showStats"
            class="btn-stats"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            {{ showStats ? '隐藏统计' : '查看统计' }}
          </button>
        </div>

        <!-- 统计面板 -->
        <div v-if="showStats" class="mb-8">
          <GameStats />
        </div>
      </div>
    </section>

    <!-- 游戏列表区域 -->
    <section class="py-8 px-4">
      <div class="container mx-auto max-w-7xl">
        <!-- 加载状态 -->
        <div v-if="gameStore.loading" class="text-center py-20">
          <div class="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white/60">正在加载游戏列表...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="gameStore.error" class="text-center py-20">
          <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-8 max-w-md mx-auto">
            <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <h3 class="text-lg font-semibold text-red-400 mb-2">加载失败</h3>
            <p class="text-white/70 mb-4">{{ gameStore.error }}</p>
            <button @click="gameStore.fetchGames()" class="btn-primary">
              重试
            </button>
          </div>
        </div>

        <!-- 游戏网格 -->
        <div v-else>
          <!-- 结果统计 -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">
              {{ gameStore.searchQuery || gameStore.selectedTags.length > 0 ? '搜索结果' : '所有游戏' }}
              <span class="text-lg text-white/60 ml-2">
                ({{ gameStore.filteredGames.length }} 个游戏)
              </span>
            </h2>
            
            <!-- 排序选项 -->
            <div class="flex items-center space-x-3">
              <label class="text-sm text-white/60">排序:</label>
              <select 
                v-model="sortBy" 
                @change="handleSortChange"
                class="bg-white/10 border border-white/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="default">默认</option>
                <option value="title">标题</option>
                <option value="type">类型</option>
              </select>
            </div>
          </div>

          <!-- 无结果状态 -->
          <div v-if="gameStore.filteredGames.length === 0" class="text-center py-20">
            <svg class="w-16 h-16 text-white/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
            <h3 class="text-xl font-semibold text-white/60 mb-2">没有找到游戏</h3>
            <p class="text-white/40 mb-4">尝试调整搜索条件或清除筛选器</p>
            <button @click="gameStore.clearFilters()" class="btn-secondary">
              清除筛选
            </button>
          </div>

          <!-- 游戏卡片网格 -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <GameCard
              v-for="game in sortedGames"
              :key="game.id"
              :game="game"
              class="animate-slide-up"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 特色游戏推荐 -->
    <section v-if="!gameStore.loading && !gameStore.error && featuredGames.length > 0" class="py-16 px-4">
      <div class="container mx-auto max-w-7xl">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">
          🌟 精选推荐
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            v-for="game in featuredGames"
            :key="game.id"
            :game="game"
            class="animate-slide-up"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-white/10 mt-20">
      <div class="container mx-auto max-w-4xl text-center">
        <div class="mb-6">
          <h3 class="text-xl font-bold font-game text-gradient mb-2">Web Game Hub</h3>
          <p class="text-white/60">让经典游戏在浏览器中重新焕发生机</p>
        </div>
        
        <div class="flex justify-center space-x-6 mb-6">
          <a href="#" class="text-white/60 hover:text-white transition-colors duration-200">关于我们</a>
          <a href="#" class="text-white/60 hover:text-white transition-colors duration-200">联系我们</a>
          <a href="#" class="text-white/60 hover:text-white transition-colors duration-200">隐私政策</a>
          <a href="https://github.com" class="text-white/60 hover:text-white transition-colors duration-200">GitHub</a>
        </div>
        
        <p class="text-white/40 text-sm">
          © 2024 Web Game Hub. Made with ❤️ for game lovers.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '../store'
import GameCard from '../components/GameCard.vue'
import SearchBar from '../components/SearchBar.vue'
import GameStats from '../components/GameStats.vue'

const gameStore = useGameStore()

// 响应式数据
const sortBy = ref('default')
const showStats = ref(false)

// 计算属性
const sortedGames = computed(() => {
  const games = [...gameStore.filteredGames]
  
  switch (sortBy.value) {
    case 'title':
      return games.sort((a, b) => a.title.localeCompare(b.title))
    case 'type':
      return games.sort((a, b) => a.type.localeCompare(b.type))
    default:
      return games
  }
})

const featuredGames = computed(() => {
  // 选择一些特色游戏进行推荐
  return gameStore.games.filter(game => 
    ['tetris-html5', 'super-mario-bros', 'space-invaders'].includes(game.id)
  ).slice(0, 3)
})

// 方法
const handleSortChange = () => {
  // 排序变化时的处理逻辑
  console.log('Sort changed to:', sortBy.value)
}

// 预加载游戏
const preloadGames = () => {
  // 预加载前3个游戏，提高用户体验
  const gamesToPreload = gameStore.games.slice(0, 3)
  gamesToPreload.forEach(game => {
    if (game.type === 'html5') {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = game.path
      document.head.appendChild(link)
    }
  })
}

// 组件挂载时获取游戏数据
onMounted(async () => {
  await gameStore.fetchGames()
  // 延迟预加载，避免影响初始页面加载
  setTimeout(preloadGames, 1000)
})
</script>

<style scoped>
.stat-card {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300;
}



/* 动画类 */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

/* 统计按钮样式 */
.btn-stats {
  @apply px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 flex items-center whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .stat-card {
    @apply p-3;
  }

  .stat-card .text-2xl {
    @apply text-xl;
  }
}
</style>
