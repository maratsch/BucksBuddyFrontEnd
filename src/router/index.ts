import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/main.vue'
import AboutView from '@/views/user.vue'
import profile from '@/views/settings.vue'
import settings from "@/views/settings.vue";
import main from "@/views/main.vue";
import user from "@/views/user.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    }
  ]
})

export default router
