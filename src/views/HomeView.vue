<template>
  <main class="h-screen flex flex-col justify-center items-center">
    <div class="mb-10">
      <h1 class="title">MusicVue</h1>
      <h2 class="subtitle"></h2>
    </div>
    <SearchBar @search="fetchData" />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import apiCall from '../api/apiCall.ts'
import { useSearchStore } from '../stores/searchStore'
import filterData from '../utils/filterData'

const searchStore = useSearchStore()
const router = useRouter()

const fetchData = async (query: string) => {
  try {
    const result = await apiCall({ query })
    const dataToFilter = Array.isArray(result) ? result : []
    if (!Array.isArray(dataToFilter)) {
      console.error('Data to filter is not an array:', dataToFilter)
      return
    }

    // Ensure each item has type, role, and formats properties
    const normalizedData = dataToFilter.map((item) => ({
      type: '',
      role: '',
      formats: [],
      ...item,
    }))
    const filteredResults = filterData(normalizedData)

    // Ensure release_date is always a string (never undefined)
    const resultsWithReleaseDate = filteredResults.map((item) => ({
      ...item,
      release_date: item.release_date ?? '',
    }))

    searchStore.setResults(resultsWithReleaseDate)
    router.push({ name: 'ResultsView' })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>

<style scoped>
.title {
  font-family: 'Oswald', serif;
  font-size: 4.5rem;
  font-weight: 400;
  background: #2fcf2f;
  background: linear-gradient(to bottom, #2fcf2f 0%, #4fb96b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-family: 'Oswald', serif;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  background: #2fcf2f;
  background: linear-gradient(to bottom, #2fcf2f 0%, #4fb96b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
