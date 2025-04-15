<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { exchangeCodeForToken } from '../api/exchangeToken'
import { useAuthStore } from '../stores/authStore'
import { createUser } from '../api/users'

const auth = useAuthStore()
const showDropdown = ref(false)

const getCodeFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('code')) {
    return null
  }
  return params.get('code')
}

const logout = () => {
  auth.logout()
  window.location.reload()
}

const redirectToLogin = () => {
  const domain = import.meta.env.VITE_AWS_DOMAIN
  const clientId = import.meta.env.VITE_AWS_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AWS_REDIRECT_URI
  const loginUrl = `${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`
  window.location.href = loginUrl
}

onMounted(() => {
  const code = getCodeFromUrl()

  if (code) {
    exchangeCodeForToken(code)
      .then(async (data: { id_token: string }) => {
        const idToken = data.id_token
        const payload = JSON.parse(atob(idToken.split('.')[1]))
        const username = payload['cognito:username']

        console.log('Username:', username)
        auth.setUser(payload['cognito:username'], idToken)

        try {
          const res = await createUser(username)
          console.log('User created or already exists:', res)
        } catch (e) {
          console.error('Error creating user:', e)
        }

        // Clean the URL
        window.history.replaceState({}, document.title, window.location.pathname)
      })
      .catch((err: Error) => {
        console.error('Error exchanging code for token', err)
      })
  }
})
</script>

<template>
  <header class="bg-white text-black py-4 px-6 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="title">MusicVue</h1>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="/" class="hover:text-gray-300">Home</a></li>
          <li><a href="/about" class="hover:text-gray-300">About</a></li>
          <li v-if="auth.username" class="relative">
            <a
              @click="showDropdown = !showDropdown"
              class="hover:bg-green-600 border-2 bg-green-500 p-2 rounded-lg text-white"
            >
              {{ auth.username }}
            </a>
            <ul
              v-if="showDropdown"
              class="absolute right-0 w-32 bg-white border rounded shadow-lg z-10"
            >
              <li>
                <a
                  href="#"
                  @click.prevent="logout"
                  class="block px-4 py-2 hover:bg-gray-200 text-black"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>

          <li v-else>
            <a
              href="#"
              @click.prevent="redirectToLogin"
              class="hover:bg-green-600 border-2 bg-green-500 p-2 rounded-lg text-white"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.title {
  font-family: 'Oswald', serif;
  font-size: 1.5rem;
  font-weight: 400;
  background: #2fcf2f;
  background: linear-gradient(to bottom, #2fcf2f 0%, #4fb96b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
