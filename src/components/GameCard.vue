<template>
  <div class="game-card group cursor-pointer" @click="playGame">
    <!-- 游戏封面 -->
    <div class="relative overflow-hidden">
      <img
        :src="game.coverImage"
        :alt="game.title"
        class="game-card-image"
        @error="handleImageError"
        v-if="!imageError"
        loading="lazy"
      >

      <!-- 默认封面图（当图片加载失败时） -->
      <div v-if="imageError" class="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div class="text-center">
          <svg class="w-12 h-12 text-white/60 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/60 text-sm">{{ game.title }}</p>
        </div>
      </div>
      
      <!-- 游戏类型标识 -->
      <div class="absolute top-2 left-2">
        <span class="game-type-badge" :class="getTypeClass(game.type)">
          {{ getTypeLabel(game.type) }}
        </span>
      </div>
      
      <!-- 播放按钮覆盖层 -->
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="play-button">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 游戏信息 -->
    <div class="p-4">
      <!-- 标题 -->
      <h3 class="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors duration-200">
        {{ game.title }}
      </h3>
      
      <!-- 描述 -->
      <p class="text-white/70 text-sm mb-3 line-clamp-2 leading-relaxed">
        {{ game.description }}
      </p>
      
      <!-- 标签 -->
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in game.tags.slice(0, 3)"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
        <span v-if="game.tags.length > 3" class="tag opacity-60">
          +{{ game.tags.length - 3 }}
        </span>
      </div>
      
      <!-- 控制说明预览 -->
      <div class="text-xs text-white/50 mb-3">
        <div class="flex items-center">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.894A1 1 0 0018 16V3z" clip-rule="evenodd"/>
          </svg>
          <span>{{ getMainControl() }}</span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex items-center justify-between">
        <button
          @click.stop="playGame"
          class="btn-primary flex-1 mr-2"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
          </svg>
          开始游戏
        </button>
        
        <button
          @click.stop="toggleFavorite"
          class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          :class="{ 'text-red-400': isFavorite, 'text-white/60': !isFavorite }"
          :title="isFavorite ? '取消收藏' : '添加收藏'"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Props
const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

// 响应式数据
const loading = ref(false)
const imageError = ref(false)
const isFavorite = ref(false)

// 计算属性
const getTypeClass = (type) => {
  const classes = {
    'html5': 'bg-green-600',
    'nes': 'bg-red-600',
    'dos': 'bg-yellow-600',
    'gba': 'bg-purple-600',
    'snes': 'bg-blue-600'
  }
  return classes[type] || 'bg-gray-600'
}

const getTypeLabel = (type) => {
  const labels = {
    'html5': 'HTML5',
    'nes': 'NES',
    'dos': 'DOS',
    'gba': 'GBA',
    'snes': 'SNES'
  }
  return labels[type] || type.toUpperCase()
}

const getMainControl = () => {
  if (props.game.controls && props.game.controls.length > 0) {
    return props.game.controls[0].key + ': ' + props.game.controls[0].action
  }
  return '点击查看控制说明'
}

// 方法
const playGame = async () => {
  loading.value = true
  try {
    await router.push(`/play/${props.game.id}`)
  } catch (error) {
    console.error('Navigation error:', error)
  } finally {
    loading.value = false
  }
}

const handleImageError = () => {
  imageError.value = true
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  
  // 这里可以添加本地存储逻辑
  const favorites = JSON.parse(localStorage.getItem('gameHub_favorites') || '[]')
  if (isFavorite.value) {
    if (!favorites.includes(props.game.id)) {
      favorites.push(props.game.id)
    }
  } else {
    const index = favorites.indexOf(props.game.id)
    if (index > -1) {
      favorites.splice(index, 1)
    }
  }
  localStorage.setItem('gameHub_favorites', JSON.stringify(favorites))
}

// 初始化收藏状态
const initFavoriteStatus = () => {
  const favorites = JSON.parse(localStorage.getItem('gameHub_favorites') || '[]')
  isFavorite.value = favorites.includes(props.game.id)
}

// 组件挂载时初始化
initFavoriteStatus()
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-type-badge {
  @apply px-2 py-1 text-xs font-bold text-white rounded-md shadow-lg;
}

.play-button {
  @apply w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 border-2 border-white/30;
}

.loading-spinner {
  @apply w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin;
}

/* 悬停效果 */
.game-card:hover {
  @apply shadow-2xl shadow-purple-500/20;
}

.game-card:hover .game-card-image {
  @apply scale-110;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .game-card {
    @apply mx-2;
  }
  
  .play-button {
    @apply w-12 h-12;
  }
  
  .play-button svg {
    @apply w-6 h-6;
  }
}
</style>
