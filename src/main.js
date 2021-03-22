import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Spinner from '@/components/Spinner'

createApp(App)
  .component('Spinner', Spinner)
  .use(store).use(router).mount('#app')
