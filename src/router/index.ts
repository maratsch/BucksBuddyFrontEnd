import {createRouter, createWebHashHistory} from 'vue-router'
import NewJourney from '@/views/NewJourney.vue'
import settings from '@/views/Settings.vue'
import main from "@/views/Main.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/newjourney',
      name: 'newjourney',
      component: NewJourney
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
