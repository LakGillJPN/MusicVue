<template>
  <main class="">
    <div class="flex justify-center items-center p-5">
      <SearchBar @search="fetchData" />
    </div>
    <div v-if="loading">Loading...</div>
    <ul v-else-if="results.length > 0">
      <div class="flex flex-col justify-center items-center">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%] p-5"
        >
          <li v-for="(item, index) in results" :key="index">
            <div
              class="w-[100%] flex flex-col justify-between items-center bg-white rounded-lg shadow-2xl cursor-pointer"
              @click="goToDetails(item.master_id)"
            >
              <div class="flex w-100 h-80 justify-center items-center">
                <img

                  v-if="item.cover_image.slice(item.cover_image.length-10, item.cover_image.length) !== 'spacer.gif' "
                  class="h-full object-cover"
                  :src="item.cover_image"
                  alt="Thumbnail"
                />

                <img
                  v-else
                  class="h-full object-cover"
                  src="../../public/No_cover.png"
                  alt="Thumbnail"
                />


              </div>
              <div class="w-full py-3 pl-4 flex flex-col items-left">
                <p class="font-bold">{{ artistName(item.title) }}</p>
                <p>{{ albumName(item.title) }}</p>
                <p>{{ item.year ? item.year : 'unknown' }}</p>
              </div>
            </div>
          </li>
        </div>
      </div>
    </ul>
    <p v-else>No results found.</p>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useSearchStore } from '../stores/searchStore'
import SearchBar from '../components/SearchBar.vue'
import apiCall from '../api/apiCall.ts'
import artistName from '../utils/artistName'
import albumName from '../utils/albumName'
import filterData from '../utils/filterData'

interface Result {
  id: number
  title: string
  cover_image: string
  year: number
  release_date: string
  master_id: number
}

const router = useRouter()
const searchStore = useSearchStore()

const results = computed<Result[]>(() => searchStore.results as Result[]);
const loading = ref(true)

const goToDetails = (masterId: number) => {
  router.push({ name: 'DetailsView', params: { masterId} })
}

const fetchData = async (query: string) => {
  try {
    const result = await apiCall({ query })
    const dataToFilter = Array.isArray(result) ? result : result.results
    if (!Array.isArray(dataToFilter)) {
      console.error('Data to filter is not an array:', dataToFilter)
      return
    }

    const filteredResults = filterData(dataToFilter)


    //searchStore.setResults(result)
    searchStore.setResults(filteredResults)

    router.push({ name: 'ResultsView' })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  if (results.value) {
    console.log('LOADING VALUE PART 1', loading.value)

    console.log('RESULTS:', results.value)
    console.log('RESULTS DATA is ARRAY:', Array.isArray(results.value))
    console.log('RESULTS LENGTH:', results.value.length)


    if (Array.isArray(results.value)) {
      console.log('Full results object:', results.value)

      if (results.value.length > 0) {
        console.log('LENGTH', results.value.length)
      }
    } else {
      console.warn("Parsed data does not contain a 'results' array:", results.value)
    }

    loading.value = false
    console.log('LOADING VALUE PART 2', loading.value)
  }
})
</script>