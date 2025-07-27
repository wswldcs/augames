import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { useSettingsStore } from './store'
import App from './App.vue'
import './style.css'

// 创建应用实例
const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()

// 使用插件
app.use(pinia)
app.use(router)

// 初始化设置
const settingsStore = useSettingsStore()
settingsStore.initSettings()

// 挂载应用
app.mount('#app')
