<template>
  <main class="h-screen flex flex-col justify-center items-center">
    <div class="flex flex-col text-left space-y-8 w-80">
      <p class="text-2xl font-semibold">{{ auth.username }}</p>

      <!-- Favourite Genres Section -->
      <div>
        <label for="favGenre" class="text-lg">Favourite Genres:</label>
        <div class="relative">
          <div class="flex space-x-2">
            <input
              type="text"
              id="favGenre"
              v-model="genreInput"
              class="p-2 border border-gray-300 rounded text-lg flex-1"
              @keydown.enter.prevent="addGenre"
            />
            <button
              @click="addGenre"
              class="p-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Enter
            </button>
          </div>
          <!-- Suggestion Dropdown -->
          <ul
            v-if="genreSuggestions.length"
            class="absolute bg-white border rounded w-full mt-1 z-10 shadow"
          >
            <li
              v-for="(suggestion, index) in genreSuggestions"
              :key="index"
              class="p-2 hover:bg-green-100 cursor-pointer"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>
        <ul class="mt-2 flex gap-2 text-md text-gray-700" v-if="genreList.length">
          <li
            class="border-2 bg-green-600 text-white rounded-xl p-2 flex items-center space-x-2"
            v-for="(genre, index) in genreList"
            :key="index"
          >
            <span>{{ genre }}</span>
            <button
              @click="removeGenre(index)"
              class="ml-1 text-white hover:text-red-300 font-bold"
              aria-label="Remove genre"
            >
              ×
            </button>
          </li>
        </ul>
      </div>

      <!-- Favourite Artists Section -->
      <div>
        <label for="favArtists" class="text-lg">Favourite Artists:</label>
        <div class="flex space-x-2">
          <input
            type="text"
            id="favArtists"
            ref="favArtistsRef"
            class="p-2 border border-gray-300 rounded text-lg flex-1"
          />
          <button
            @click="addArtist"
            class="p-2 bg-white text-green-600 rounded hover:bg-grey-200 text-sm"
          >
            Enter
          </button>
        </div>
        <ul class="mt-2 flex gap-2 text-md text-gray-700" v-if="artistList.length">
          <li
            class="border-2 bg-white text-green-600 rounded-xl p-2"
            v-for="(artist, index) in artistList"
            :key="index"
          >
            {{ artist }}
          </li>
        </ul>
      </div>
      <button
        @click="saveFavourites"
        class="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Favourites
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useUserStore } from '@/stores/userStore'
import genreArray from '../utils/genreArray'
import { getFavourites, addFavourites } from '@/api/favourites'

const auth = useAuthStore()
const user = useUserStore()
const userId = user.user?.userId

const favGenreRef = ref<HTMLInputElement | null>(null)
const favArtistsRef = ref<HTMLInputElement | null>(null)

const genreList = ref<string[]>([])
const artistList = ref<string[]>([])

const genreSuggestions = ref<string[]>([])
const genreInput = ref('')

onMounted(async () => {
  if (auth.cognitoId) {
    try {
      const data = await getFavourites(auth.cognitoId)
      console.log('Fetched favourites:', data)
      genreList.value = data.favGenres || []
      artistList.value = data.favArtists || []
    } catch (error) {
      console.error('Failed to fetch favourites:', error)
    }
  }
})

watch(genreInput, (newVal) => {
  if (!newVal) {
    genreSuggestions.value = []
  } else {
    const lower = newVal.toLowerCase()
    genreSuggestions.value = genreArray
      .filter(
        (g) => g.toLowerCase().includes(lower) && !genreList.value.includes(g), // prevent duplicates
      )
      .slice(0, 5) // limit suggestions
  }
})

const selectSuggestion = (genre: string) => {
  genreList.value.push(genre)
  genreInput.value = ''
  genreSuggestions.value = []
}

const addGenre = () => {
  const genre = favGenreRef.value?.value.trim()
  if (genre) {
    genreList.value.push(genre)
    favGenreRef.value!.value = ''
  }
}

const removeGenre = (index: number) => {
  genreList.value.splice(index, 1)
}

const addArtist = () => {
  const artist = favArtistsRef.value?.value.trim()
  if (artist) {
    artistList.value.push(artist)
    favArtistsRef.value!.value = ''
  }
}

const saveFavourites = async () => {
  try {
    await addFavourites({
      userId: userId,
      favGenres: genreList.value,
      favArtists: artistList.value,
      favAlbums: [], // Add album input handling if needed
    })
    alert('Favourites saved successfully!')
  } catch (error) {
    console.error('Failed to save favourites:', error)
    alert('Failed to save favourites.')
  }
}
</script>
