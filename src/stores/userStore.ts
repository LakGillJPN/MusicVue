// stores/userStore.ts
import { defineStore } from 'pinia'
import { getUserById, type User } from '../api/users' 

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser(cognitoId: string) {

      this.user = await getUserById(cognitoId)
    },
  },
  persist: true, // optional
})
