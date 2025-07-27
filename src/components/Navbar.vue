<template>
  <nav class="navbar">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo和标题 -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold font-game text-gradient">Web Game Hub</h1>
            <p class="text-xs text-white/60">网页游戏中心</p>
          </div>
        </router-link>

        <!-- 导航菜单 -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'active': $route.name === 'Home' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            首页
          </router-link>
          
          <router-link 
            to="/about" 
            class="nav-link"
            :class="{ 'active': $route.name === 'About' }"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            关于
          </router-link>
        </div>

        <!-- 设置和移动端菜单按钮 -->
        <div class="flex items-center space-x-3">
          <!-- 设置按钮 -->
          <button 
            @click="showSettings = !showSettings"
            class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            title="设置"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- 移动端菜单按钮 -->
          <button 
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <transition name="slide-down">
        <div v-if="showMobileMenu" class="md:hidden mt-4 py-4 border-t border-white/10">
          <div class="flex flex-col space-y-3">
            <router-link 
              to="/" 
              class="nav-link-mobile"
              @click="showMobileMenu = false"
            >
              首页
            </router-link>
            <router-link 
              to="/about" 
              class="nav-link-mobile"
              @click="showMobileMenu = false"
            >
              关于
            </router-link>
          </div>
        </div>
      </transition>

      <!-- 设置面板 -->
      <transition name="slide-down">
        <div v-if="showSettings" class="mt-4 p-4 bg-black/20 rounded-lg border border-white/10">
          <h3 class="text-lg font-semibold mb-3">设置</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm">音量</span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                :value="settingsStore.volume"
                @input="settingsStore.setVolume($event.target.value)"
                class="w-20"
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">自动保存</span>
              <button 
                @click="settingsStore.toggleAutoSave()"
                class="toggle-button"
                :class="{ 'active': settingsStore.autoSave }"
              >
                {{ settingsStore.autoSave ? '开启' : '关闭' }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '../store'

const settingsStore = useSettingsStore()

const showMobileMenu = ref(false)
const showSettings = ref(false)

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  if (!event.target.closest('.navbar')) {
    showMobileMenu.value = false
    showSettings.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.nav-link {
  @apply flex items-center px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium;
}

.nav-link.active {
  @apply text-white bg-white/15;
}

.nav-link-mobile {
  @apply block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200;
}

.toggle-button {
  @apply px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors duration-200 text-sm;
}

.toggle-button.active {
  @apply bg-green-600 hover:bg-green-700;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
