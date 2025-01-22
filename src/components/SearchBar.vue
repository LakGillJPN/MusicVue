<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const searchTerm = ref('')
const emit = defineEmits(['search'])

const handleSearch = () => {
  if (searchTerm.value.trim()) {
    emit('search', searchTerm.value)
  }
}
</script>

<template>
    <div class="flex justify-center items-center w-full sm:w-3/4 lg:w-1/2 px-4">
      <div class="flex w-full sm:w-4/5 lg:w-3/4 relative">
        <!-- Search Input -->
        <input
          v-model="searchTerm"
          type="text"
          class="w-full h-12 px-10 py-2 text-lg sm:text-base rounded-l-lg shadow  focus:outline-none"
          placeholder="Enter in an artist..."
          @keyup.enter="handleSearch"
        />
        <!-- Search Icon -->
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4a6 6 0 106 6h.01M8 8a8 8 0 1116 0c0 3.9-2.6 7.1-6 8.5L16 20l-2-2m6-2v2a2 2 0 11-4 0h4z" />
          </svg>
        </div>
        <!-- Search Button -->
        <button
          class=" px-4 py-2 bg-green-500 text-white text-sm sm:text-base rounded-l-lg rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white-500"
          @click="handleSearch"
        >
          Search
        </button>
      </div>
    </div>
  </template>
  
