<template>
  <div class="min-h-screen">
    <div class="container mx-auto max-w-4xl px-4 py-12">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold font-game text-gradient mb-4">
          关于 Web Game Hub
        </h1>
        <p class="text-xl text-white/80">
          让经典游戏在浏览器中重新焕发生机
        </p>
      </div>

      <!-- 项目介绍 -->
      <section class="mb-12">
        <div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
          <h2 class="text-2xl font-bold text-white mb-4">🎮 项目简介</h2>
          <div class="text-white/70 leading-relaxed space-y-4">
            <p>
              Web Game Hub 是一个开放、可扩展的纯前端游戏聚合平台。我们的目标是为用户提供一个
              无需下载安装、即点即玩的游戏体验，让经典游戏在现代浏览器中重新焕发生机。
            </p>
            <p>
              平台支持多种类型的游戏，包括现代的 HTML5 游戏和通过 WebAssembly 技术运行的
              经典模拟器游戏（如 NES、DOS 等）。所有游戏都经过精心挑选，确保良好的游戏体验。
            </p>
          </div>
        </div>
      </section>

      <!-- 技术特色 -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">⚡ 技术特色</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="feature-card">
            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">响应式设计</h3>
            <p class="text-white/60">完美适配桌面、平板和移动设备，随时随地享受游戏乐趣。</p>
          </div>

          <div class="feature-card">
            <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">极速加载</h3>
            <p class="text-white/60">基于 Vite 构建，采用现代前端技术，确保快速的加载和流畅的体验。</p>
          </div>

          <div class="feature-card">
            <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">开源项目</h3>
            <p class="text-white/60">完全开源，欢迎开发者贡献代码，共同完善游戏平台。</p>
          </div>

          <div class="feature-card">
            <div class="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">安全可靠</h3>
            <p class="text-white/60">所有游戏运行在沙箱环境中，确保用户设备和数据的安全。</p>
          </div>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="mb-12">
        <div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
          <h2 class="text-2xl font-bold text-white mb-6">🛠️ 技术栈</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="tech-item">
              <div class="text-green-400 font-semibold">Vue 3</div>
              <div class="text-white/60 text-sm">前端框架</div>
            </div>
            <div class="tech-item">
              <div class="text-blue-400 font-semibold">Vite</div>
              <div class="text-white/60 text-sm">构建工具</div>
            </div>
            <div class="tech-item">
              <div class="text-purple-400 font-semibold">Tailwind CSS</div>
              <div class="text-white/60 text-sm">样式框架</div>
            </div>
            <div class="tech-item">
              <div class="text-yellow-400 font-semibold">Pinia</div>
              <div class="text-white/60 text-sm">状态管理</div>
            </div>
            <div class="tech-item">
              <div class="text-red-400 font-semibold">Vue Router</div>
              <div class="text-white/60 text-sm">路由管理</div>
            </div>
            <div class="tech-item">
              <div class="text-indigo-400 font-semibold">WebAssembly</div>
              <div class="text-white/60 text-sm">模拟器技术</div>
            </div>
            <div class="tech-item">
              <div class="text-pink-400 font-semibold">GitHub Pages</div>
              <div class="text-white/60 text-sm">部署平台</div>
            </div>
            <div class="tech-item">
              <div class="text-cyan-400 font-semibold">HTML5</div>
              <div class="text-white/60 text-sm">游戏技术</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系信息 -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-white/10 p-8">
          <h2 class="text-2xl font-bold text-white mb-4">📞 联系我们</h2>
          <p class="text-white/70 mb-6">
            如果您有任何问题、建议或想要贡献游戏资源，欢迎与我们联系！
          </p>
          <div class="flex justify-center space-x-4">
            <a href="https://github.com" class="contact-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
              </svg>
              GitHub
            </a>
            <a href="mailto:contact@example.com" class="contact-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              邮箱
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '关于我们 - Web Game Hub'
})
</script>

<style scoped>
.feature-card {
  @apply bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300;
}

.tech-item {
  @apply text-center p-3 bg-white/5 rounded-lg border border-white/10;
}

.contact-link {
  @apply inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white;
}
</style>
