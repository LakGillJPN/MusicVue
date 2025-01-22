import { useRouter } from 'vue-router'
import apiCall from '../api/apiCall.ts'
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()
const router = useRouter()

const fetchData = async (query: string) => {
    try {
      const result = await apiCall({query})
      searchStore.setResults(result) 
      router.push({ name: 'ResultsView' }) 
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  export default fetchData