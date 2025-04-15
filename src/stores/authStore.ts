import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null as string | null,
    idToken: null as string | null
  }),
  actions: {
    setUser(username: string, token: string) {
      this.username = username
      this.idToken = token
    },
    logout() {
      this.username = null
      this.idToken = null
    }
  },
  persist: true 
})
