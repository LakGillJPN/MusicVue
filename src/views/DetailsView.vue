<template>
  <main class="flex flex-col lg:flex-row justify-center mx-4 pt-10">
    <div v-if="loading">Loading details...</div>
    <div v-else-if="details" class="flex flex-col lg:flex-row gap-4 w-full">
      <!-- Left Section: Image -->
      <div class="">
        <div class="flex w-full h-100 justify-center items-center">
          <img
            v-if="details.images.length > 0"
            class="h-full object-cover"
            :src="details.images[0].resource_url ?? undefined"
            alt="Thumbnail"
          />

          <img v-else class="h-full object-cover" src="../../public/No_cover.png" alt="Thumbnail" />
        </div>
      </div>

      <!-- Right Section: Track List -->

      <div class="flex flex-col w-full">
        <h1 class="self-start inline-block text-2xl bg-gray-200 px-4 text-gray-700 rounded-xl">
          {{ details.year }}
        </h1>

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
        <div class="">
          <h3 class="font-bold text-xl mb-5">Track Listing:</h3>
          <ul>
            <template v-for="(track, index) in details.filteredTracks" :key="index">
              <!-- Track Item -->
              <li class="mb-5 h-15 text-xl py-5 flex items-center w-full rounded-xl bg-gray-200">
                <!-- Track Position (15%) -->
                <p class="flex-shrink-0 flex-grow-0 basis-[15%] text-gray-500 text-center">
                  {{ addZero(track.position) }}
                </p>

                <!-- Play Button (15%) -->
                <div
                  class="flex-shrink-0 flex-grow-0 basis-[10%] flex justify-center cursor-pointer"
                  @click="toggleDropdown(index, track.title, details.videos)"
                >
                  <img
                    v-if="playButton(track.title, details.videos as any)"
                    class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                    :src="playButton(track.title, details.videos as any) "
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
                    :src="getVideoUrl(track.title, details.videos as any)"
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
import { useRoute, useRouter } from 'vue-router'
import addZero from '../utils/addZero'
import filterDetails from '@/utils/filterDetails'
import getVideoUrl from '../utils/getVideoUrl'
import playButton from '../utils/playButton'

interface Details {
  images: { resource_url: string; uri: string }[]
  artists: { name: string }[]
  title: string
  genres: string[]
  tracklist: { position: string; title: string; duration: string }[]
  videos: { title: string; uri: string }[]
  filteredTracks: { position: string; title: string; duration: string }[]
  year: string | number
  uri: string

}

const route = useRoute()
const router = useRouter()
const masterId = ref<number | null>(null)
const details: Ref<Details | null> = ref(null)
const openDropdown = ref<number | null>(null)
const loading = ref(true)

const fetchDetails = async () => {
  if (!masterId.value) return

  try {
    const result = await detailsCall({ master: masterId.value })
    //const filteredResults: Details[] = filterDetails(result)

    if (!result || typeof result !== 'object') throw new Error('Invalid API response')

    const mappedResult = {
      images: result.images || [],
      artists: result.artists || [],
      title: result.title || '',
      genres: result.genres || [],
      tracklist: result.tracklist || [],
      videos: result.videos || [],
      filteredTracks: result.tracklist || [], // Assuming filteredTracks is derived from tracklist
      year: result.year || '',
      uri: result.uri || '',
    } as Details


    details.value = mappedResult;

    console.log('DETAILS VALUE', filterDetails(result))
  } catch (error) {
    console.error('Error fetching details:', error)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push({ name: 'ResultsView' })
}

const toggleDropdown = (index: number, trackTitle: string, array: { title: string; uri: string }[]) => {
  const matchedVideo = array.find((video: { title: string }) =>
    video.title.toLowerCase().includes(trackTitle.toLowerCase()),
  )

  if (matchedVideo) {
    openDropdown.value = openDropdown.value === index ? null : index
  }
}

onMounted(() => {
  masterId.value = Number(route.params.masterId)
  if (masterId.value) {
    fetchDetails()
  } else {
    loading.value = false
  }
})
</script>
<style lang=""></style>
