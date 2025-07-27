import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 游戏数据存储
export const useGameStore = defineStore('game', () => {
  // 状态
  const games = ref([])
  const currentGame = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedTags = ref([])

  // 计算属性
  const filteredGames = computed(() => {
    let filtered = games.value

    // 按搜索关键词过滤
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 按标签过滤
    if (selectedTags.value.length > 0) {
      filtered = filtered.filter(game =>
        selectedTags.value.every(tag =>
          game.tags.some(gameTag => gameTag.toLowerCase() === tag.toLowerCase())
        )
      )
    }

    return filtered
  })

  const allTags = computed(() => {
    const tagSet = new Set()
    games.value.forEach(game => {
      game.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  })

  const gamesByType = computed(() => {
    const types = {}
    games.value.forEach(game => {
      if (!types[game.type]) {
        types[game.type] = []
      }
      types[game.type].push(game)
    })
    return types
  })

  // 动作
  const fetchGames = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/games.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      games.value = data
    } catch (err) {
      error.value = `加载游戏列表失败: ${err.message}`
      console.error('Error fetching games:', err)
    } finally {
      loading.value = false
    }
  }

  const getGameById = (id) => {
    return games.value.find(game => game.id === id)
  }

  const setCurrentGame = (gameId) => {
    const game = getGameById(gameId)
    if (game) {
      currentGame.value = game
    } else {
      error.value = `游戏 "${gameId}" 未找到`
    }
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag)
    if (index > -1) {
      selectedTags.value.splice(index, 1)
    } else {
      selectedTags.value.push(tag)
    }
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedTags.value = []
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // 状态
    games,
    currentGame,
    loading,
    error,
    searchQuery,
    selectedTags,
    
    // 计算属性
    filteredGames,
    allTags,
    gamesByType,
    
    // 动作
    fetchGames,
    getGameById,
    setCurrentGame,
    setSearchQuery,
    toggleTag,
    clearFilters,
    clearError
  }
})

// 应用设置存储
export const useSettingsStore = defineStore('settings', () => {
  // 状态
  const theme = ref('dark')
  const volume = ref(0.7)
  const fullscreenMode = ref(false)
  const autoSave = ref(true)

  // 动作
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('gameHub_theme', newTheme)
  }

  const setVolume = (newVolume) => {
    volume.value = Math.max(0, Math.min(1, newVolume))
    localStorage.setItem('gameHub_volume', volume.value.toString())
  }

  const toggleFullscreen = () => {
    fullscreenMode.value = !fullscreenMode.value
  }

  const toggleAutoSave = () => {
    autoSave.value = !autoSave.value
    localStorage.setItem('gameHub_autoSave', autoSave.value.toString())
  }

  // 初始化设置
  const initSettings = () => {
    const savedTheme = localStorage.getItem('gameHub_theme')
    if (savedTheme) {
      theme.value = savedTheme
    }

    const savedVolume = localStorage.getItem('gameHub_volume')
    if (savedVolume) {
      volume.value = parseFloat(savedVolume)
    }

    const savedAutoSave = localStorage.getItem('gameHub_autoSave')
    if (savedAutoSave) {
      autoSave.value = savedAutoSave === 'true'
    }
  }

  return {
    // 状态
    theme,
    volume,
    fullscreenMode,
    autoSave,
    
    // 动作
    setTheme,
    setVolume,
    toggleFullscreen,
    toggleAutoSave,
    initSettings
  }
})
