import './assets/styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//const app = createApp(App)
createApp(App).use(router).mount("#app")
//app.use(router)

//app.mount('#app')
