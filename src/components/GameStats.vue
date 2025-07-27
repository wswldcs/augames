<template>
  <div class="stats-container">
    <div class="stats-header">
      <h2 class="text-2xl font-bold text-white mb-2">🎮 游戏统计</h2>
      <p class="text-white/70 mb-6">查看所有游戏的游玩次数统计</p>
    </div>

    <div class="stats-summary mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <div class="stat-number">{{ totalPlays }}</div>
            <div class="stat-label">总游玩次数</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <div class="stat-number">{{ mostPlayedGame?.count || 0 }}</div>
            <div class="stat-label">最高游玩次数</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎮</div>
          <div class="stat-info">
            <div class="stat-number">{{ playedGamesCount }}</div>
            <div class="stat-label">已游玩游戏数</div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-list">
      <h3 class="text-xl font-semibold text-white mb-4">游戏排行榜</h3>
      
      <div class="space-y-3">
        <div
          v-for="(item, index) in sortedStats"
          :key="item.gameId"
          class="stat-item"
        >
          <div class="flex items-center">
            <div class="rank-badge" :class="getRankClass(index)">
              {{ index + 1 }}
            </div>
            
            <div class="game-info flex-1 ml-4">
              <div class="game-title">{{ getGameTitle(item.gameId) }}</div>
              <div class="game-subtitle">{{ getGameDescription(item.gameId) }}</div>
            </div>
            
            <div class="play-count">
              <div class="count-number">{{ item.count }}</div>
              <div class="count-label">次游玩</div>
            </div>
          </div>
          
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: getProgressWidth(item.count) + '%' }"
            ></div>
          </div>
        </div>
      </div>
      
      <div v-if="sortedStats.length === 0" class="empty-state">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">🎮</div>
          <h3 class="text-xl font-semibold text-white mb-2">还没有游戏统计</h3>
          <p class="text-white/60">开始游玩一些游戏来查看统计信息吧！</p>
        </div>
      </div>
    </div>

    <div class="stats-actions mt-8">
      <button
        @click="clearStats"
        class="btn-secondary"
        :disabled="sortedStats.length === 0"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        清除统计数据
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const stats = ref({})
const games = ref([])

// 计算属性
const sortedStats = computed(() => {
  return Object.entries(stats.value)
    .map(([gameId, count]) => ({ gameId, count }))
    .sort((a, b) => b.count - a.count)
})

const totalPlays = computed(() => {
  return Object.values(stats.value).reduce((sum, count) => sum + count, 0)
})

const mostPlayedGame = computed(() => {
  if (sortedStats.value.length === 0) return null
  return sortedStats.value[0]
})

const playedGamesCount = computed(() => {
  return Object.keys(stats.value).length
})

// 方法
const loadStats = () => {
  const savedStats = localStorage.getItem('gameHub_stats')
  stats.value = savedStats ? JSON.parse(savedStats) : {}
}

const loadGames = async () => {
  try {
    const response = await fetch('/games.json')
    games.value = await response.json()
  } catch (error) {
    console.error('Failed to load games:', error)
  }
}

const getGameTitle = (gameId) => {
  const game = games.value.find(g => g.id === gameId)
  return game ? game.title : gameId
}

const getGameDescription = (gameId) => {
  const game = games.value.find(g => g.id === gameId)
  return game ? game.tags.join(' • ') : '未知游戏'
}

const getRankClass = (index) => {
  if (index === 0) return 'rank-gold'
  if (index === 1) return 'rank-silver'
  if (index === 2) return 'rank-bronze'
  return 'rank-default'
}

const getProgressWidth = (count) => {
  const maxCount = mostPlayedGame.value?.count || 1
  return (count / maxCount) * 100
}

const clearStats = () => {
  if (confirm('确定要清除所有统计数据吗？此操作不可撤销。')) {
    localStorage.removeItem('gameHub_stats')
    stats.value = {}
  }
}

// 生命周期
onMounted(() => {
  loadStats()
  loadGames()
})
</script>

<style scoped>
.stats-container {
  @apply max-w-4xl mx-auto p-6;
}

.stat-card {
  @apply bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center space-x-4 border border-white/20;
}

.stat-icon {
  @apply text-3xl;
}

.stat-number {
  @apply text-2xl font-bold text-white;
}

.stat-label {
  @apply text-sm text-white/60;
}

.stat-item {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200;
}

.rank-badge {
  @apply w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white;
}

.rank-gold {
  @apply bg-gradient-to-r from-yellow-400 to-yellow-600;
}

.rank-silver {
  @apply bg-gradient-to-r from-gray-300 to-gray-500;
}

.rank-bronze {
  @apply bg-gradient-to-r from-orange-400 to-orange-600;
}

.rank-default {
  @apply bg-white/20;
}

.game-title {
  @apply text-white font-semibold;
}

.game-subtitle {
  @apply text-white/60 text-sm;
}

.count-number {
  @apply text-lg font-bold text-white text-right;
}

.count-label {
  @apply text-xs text-white/60 text-right;
}

.progress-bar {
  @apply w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden;
}

.progress-fill {
  @apply h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500;
}

.empty-state {
  @apply bg-white/5 backdrop-blur-sm rounded-xl border border-white/10;
}

.btn-secondary {
  @apply px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
