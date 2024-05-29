import './assets/styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(router).mount("#app")

import { useThemeStore } from './stores/themeStore.ts';
const themeStore = useThemeStore();
themeStore.loadTheme();
