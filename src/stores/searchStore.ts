/* eslint-disable @typescript-eslint/no-empty-object-type */
// stores/searchStore.ts
import { defineStore } from 'pinia'

export interface Result {
  
  id: number;
  title: string;
  cover_image: string;
  release_date: string;
  master_id: number;
  year: string | number;
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    results: JSON.parse(localStorage.getItem('searchResults') || '[]') as Result[],
  }),
  actions: {
    setResults(data: Result[]) {
      this.results = data
      // Save the results to localStorage
      localStorage.setItem('searchResults', JSON.stringify(data))
    },
    loadResults() {
      // Load results from localStorage
      const savedResults = localStorage.getItem('searchResults')
      if (savedResults) {
        this.results = JSON.parse(savedResults)
      }
    },
    clearResults() {
      this.results = []
      localStorage.removeItem('searchResults')
    },
  },
})

// export const useSearchStore = defineStore<'search', { results: Result[] }, {}, { setResults(data: Result[]): void }>('search', {
//   state: () => ({
//     results: [] as Result[],
//   }),
//   actions: {
//     setResults(data: Result[]) {
//       this.results = data
//     },
//   },
//   persist: true, 
// })
