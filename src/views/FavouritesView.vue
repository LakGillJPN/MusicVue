<template>
  <main class="">
    <h1 class="text-center text-2xl font-bold my-4">Favourite Albums</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="albumDetails.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%] mx-auto">
        <div
          v-for="(item, index) in albumDetails"
          :key="index"
          class="bg-white rounded-lg shadow-xl cursor-pointer flex flex-col items-center"
          @click="goToDetails(item.id)"
        >
          <div class="h-80 flex justify-center items-center w-full">
            <img
              v-if="item.images && item.images.length > 0 && item.images[0].uri && !item.images[0].uri.endsWith('spacer.gif')"
              class="h-full object-cover"
              :src="item.images[0].uri"
              alt="Thumbnail"
            />
            <img
              v-else
              class="h-full object-cover"
              src="../../public/No_cover.png"
              alt="No cover"
            />
          </div>
          <div class="w-full p-4 text-left">
            <p class="font-bold">{{ item.title }}</p>
            <p>{{ item.year || 'Unknown' }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center">No favourites found.</p>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAlbums } from '../api/album';
import detailsCall from '../api/detailsCall';
import { useUserStore } from '@/stores/userStore';

const user = useUserStore()
const userId = user.user?.userId

interface AlbumDetail {
  id: number;
  title: string;
  year: number;
  images?: { uri: string }[];
}

const router = useRouter();
const loading = ref(true);
const albumDetails = ref<AlbumDetail[]>([]);

const fetchFavourites = async () => {
  try {
    if (!userId) {
      throw new Error('No userId found in localStorage');
    }

    const favouritesResponse = await getAlbums(userId);
    console.log('Favourites response:', favouritesResponse);
    const albumIds = favouritesResponse.favourites;


    if (!Array.isArray(albumIds)) {
      throw new Error('Invalid favourites data');
    }

    const detailsPromises = albumIds.map(id => detailsCall({ master: id }));
    const details = await Promise.all(detailsPromises);

    albumDetails.value = details;
  } catch (error) {
    console.error('Error loading favourites:', error);
  } finally {
    loading.value = false;
  }
};

const goToDetails = (masterId: number) => {
  router.push({ name: 'DetailsView', params: { masterId } });
};

onMounted(fetchFavourites);
</script>
