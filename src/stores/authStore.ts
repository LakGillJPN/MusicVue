import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: null as string | null,
    idToken: null as string | null,
    cognitoId: null as number | null,
  }),
  actions: {
    setUser(username: string, token: string, cognitoID: number) {
      this.username = username
      this.idToken = token
      this.cognitoId = cognitoID
    },
    logout() {
      this.username = null
      this.idToken = null
    }
  },
  persist: true 
})
