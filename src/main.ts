import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/authStore'
import { useSearchStore } from './stores/searchStore'
import { useUserStore } from './stores/userStore'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const auth = useAuthStore()
const userStore = useUserStore()
const searchStore = useSearchStore()

// Only call after app.use(pinia)
if (auth.cognitoId !== null) {
  userStore.fetchUser(auth.cognitoId).catch((e) =>
    console.error('Failed to fetch user:', e)
  )
} else {
  console.error('auth.cognitoId is null')
}

searchStore.loadResults()

app.mount('#app')
