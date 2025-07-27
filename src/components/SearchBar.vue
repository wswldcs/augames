<template>
  <div class="search-container">
    <!-- 搜索输入框 -->
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索游戏..."
        class="search-input pl-10 pr-10 w-full"
        @input="handleSearch"
        @keyup.enter="handleEnter"
      >
      <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          @click="clearSearch"
          class="text-white/60 hover:text-white transition-colors duration-200"
          title="清除搜索"
        >
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 标签筛选 -->
    <div class="mt-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-medium text-white/80">按类型筛选</h3>
        <button
          v-if="selectedTags.length > 0"
          @click="clearAllTags"
          class="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200"
        >
          清除全部
        </button>
      </div>
      
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="toggleTag(tag)"
          class="tag-button"
          :class="{ 'active': selectedTags.includes(tag) }"
        >
          {{ tag }}
          <span class="ml-1 text-xs opacity-70">
            ({{ getTagCount(tag) }})
          </span>
        </button>
      </div>
    </div>

    <!-- 搜索结果统计 -->
    <div v-if="showStats" class="mt-4 text-sm text-white/60">
      <div class="flex items-center justify-between">
        <span>
          找到 {{ filteredGamesCount }} 个游戏
          <span v-if="searchQuery || selectedTags.length > 0">
            (共 {{ totalGamesCount }} 个)
          </span>
        </span>
        <button
          v-if="searchQuery || selectedTags.length > 0"
          @click="clearAllFilters"
          class="text-purple-400 hover:text-purple-300 transition-colors duration-200"
        >
          清除筛选
        </button>
      </div>
    </div>

    <!-- 快速搜索建议 -->
    <div v-if="showSuggestions && searchSuggestions.length > 0" class="mt-3">
      <div class="bg-black/20 rounded-lg border border-white/10 p-3">
        <h4 class="text-xs font-medium text-white/60 mb-2">搜索建议</h4>
        <div class="flex flex-wrap gap-1">
          <button
            v-for="suggestion in searchSuggestions"
            :key="suggestion"
            @click="applySuggestion(suggestion)"
            class="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors duration-200"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '../store'

const gameStore = useGameStore()

// 响应式数据
const searchQuery = ref('')
const selectedTags = ref([])
const showSuggestions = ref(false)

// 定义 props
const props = defineProps({
  showStats: {
    type: Boolean,
    default: true
  }
})

// 计算属性
const allTags = computed(() => gameStore.allTags)
const filteredGamesCount = computed(() => gameStore.filteredGames.length)
const totalGamesCount = computed(() => gameStore.games.length)

const searchSuggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  
  const suggestions = new Set()
  const query = searchQuery.value.toLowerCase()
  
  gameStore.games.forEach(game => {
    // 添加匹配的标签
    game.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query) && tag.toLowerCase() !== query) {
        suggestions.add(tag)
      }
    })
    
    // 添加匹配的游戏标题词汇
    const titleWords = game.title.split(/\s+/)
    titleWords.forEach(word => {
      if (word.toLowerCase().includes(query) && word.toLowerCase() !== query && word.length > 2) {
        suggestions.add(word)
      }
    })
  })
  
  return Array.from(suggestions).slice(0, 5)
})

// 方法
const handleSearch = () => {
  gameStore.setSearchQuery(searchQuery.value)
  showSuggestions.value = searchQuery.value.length >= 2 && searchSuggestions.value.length > 0
}

const handleEnter = () => {
  showSuggestions.value = false
}

const clearSearch = () => {
  searchQuery.value = ''
  gameStore.setSearchQuery('')
  showSuggestions.value = false
}

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  gameStore.selectedTags = [...selectedTags.value]
}

const clearAllTags = () => {
  selectedTags.value = []
  gameStore.selectedTags = []
}

const clearAllFilters = () => {
  clearSearch()
  clearAllTags()
}

const getTagCount = (tag) => {
  return gameStore.games.filter(game => game.tags.includes(tag)).length
}

const applySuggestion = (suggestion) => {
  searchQuery.value = suggestion
  handleSearch()
  showSuggestions.value = false
}

// 监听器
watch(searchQuery, (newValue) => {
  if (!newValue) {
    showSuggestions.value = false
  }
})

// 同步 store 中的搜索状态
watch(() => gameStore.searchQuery, (newValue) => {
  if (newValue !== searchQuery.value) {
    searchQuery.value = newValue
  }
})

watch(() => gameStore.selectedTags, (newValue) => {
  selectedTags.value = [...newValue]
})
</script>

<style scoped>
.search-container {
  @apply w-full max-w-2xl mx-auto;
}

.tag-button {
  @apply px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-full transition-all duration-200 border border-transparent;
}

.tag-button.active {
  @apply bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400/50 shadow-lg;
}

.tag-button:hover {
  @apply transform scale-105;
}
</style>
