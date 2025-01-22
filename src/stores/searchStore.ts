// stores/searchStore.ts
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    results: { results: [] },
  }),
  actions: {
    setResults(data: any) {
      this.results = data
    },
  },
  persist: true, 
})
