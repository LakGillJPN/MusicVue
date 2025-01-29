<template>
  <main class="flex flex-col lg:flex-row justify-center mx-4 pt-10">
    <div v-if="details" class="flex flex-col lg:flex-row gap-4 w-full">
      <!-- Left Section: Image -->
      <div class="">
        <div class="flex w-full h-100 justify-center items-center">
          <img
            v-if="
              details.images[0]?.resource_url !==
              'https://st.discogs.com/c4d19cea99cdfcd895132e47983ad7ea43099b37/images/spacer.gif'
            "
            class="h-full object-cover"
            :src="details.images[0].resource_url"
            alt="Thumbnail"
          />
        </div>
      </div>

      <!-- Right Section: Track List -->
      <div class="flex flex-col w-full">
        <div class="flex flex-col mb-5">
          <h1 class="text-5xl mb-2">{{ details.artists[0].name }}</h1>
          <h1 class="text-4xl text-gray-500">{{ details.title }}</h1>
        </div>

        <div class="flex mb-5 w-full flex-row">
          <div class="flex flex-col w-1/2">
            <p class="font-bold">Genre:</p>
            <p class="text-gray-500">{{ details.genres.join(', ') }}</p>
          </div>

          <div class="flex flex-col w-1/2">
            <p class="font-bold">Tracks:</p>
            <p class="text-gray-500">{{ details.tracklist.length }} songs</p>
          </div>
        </div>

        <!-- Track Listing -->
        <div class="mr-4">
          <h3 class="font-bold text-xl mb-5">Track Listing:</h3>
          <ul>
            <template v-for="(track, index) in details.tracklist" :key="index">
              <!-- Track Item -->
              <li class="mb-5 h-15 text-xl py-5 flex items-center w-full rounded-xl bg-gray-200">
                <!-- Track Position (15%) -->
                <p class="flex-shrink-0 flex-grow-0 basis-[15%] text-gray-500 text-center">
                  {{ addZero(track.position) }}
                </p>

                <!-- Play Button (15%) -->
                <div
                  class="flex-shrink-0 flex-grow-0 basis-[15%] flex justify-center cursor-pointer"
                  @click="toggleDropdown(index)"
                >
                  <img
                    class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                    src="../../public/play-button.png"
                    alt="Play button"
                  />
                </div>

                <!-- Track Title (Remaining 55%) -->
                <p class="flex-grow basis-[55%] px-4">
                  {{ track.title }}
                </p>

                <!-- Track Duration (15%) -->
                <p class="flex-shrink-0 flex-grow-0 basis-[15%] text-right text-gray-500 pr-4">
                  {{ track.duration }}
                </p>
              </li>

              <!-- Dropdown for YouTube Video (Appears Below Clicked Track) -->
              <li v-if="openDropdown === index" class="mb-5 w-full">
                <div class="bg-white shadow-lg rounded-xl p-4">
                  <iframe
                    class="w-full aspect-video"
                    :src="details.videos[index].uri.replace('/watch?v=', '/embed/')"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </main>
  <a href="https://www.flaticon.com/free-icons/play-button" title="play button icons"
    >Play button icons created by Alfredo Hernandez - Flaticon</a
  >
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import detailsCall from '@/api/detailsCall'
import addZero from '../utils/addZero'

interface Details {
  images: { resource_url: string }[]
  artists: { name: string }[]
  title: string
  genres: string[]
  tracklist: { position: string; title: string; duration: string }[]
  videos: { uri: string }[]
}

const details: Ref<Details | null> = ref(null)
const openDropdown = ref<number | null>(null)

const fetchData = async (master: number) => {
  try {
    const result = await detailsCall({ master })
    console.log(result)

    //searchStore.setResults(result)
    details.value = result
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const toggleDropdown = (index: number) => {
  openDropdown.value = openDropdown.value === index ? null : index
}

onMounted(() => {
  const query = 73754 // Adjust this as needed
  fetchData(query)
})
</script>
<style lang=""></style>