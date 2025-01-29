<script setup lang="ts">
</script>

<template>
  <header class="bg-white text-black py-4 px-6 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="title">MusicVue</h1>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="/" class="hover:text-gray-300">Home</a></li>
          <li><a href="/about" class="hover:text-gray-300">About</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.title {
  font-family: 'Oswald', serif;
  font-size: 1.5rem;
  font-weight: 400;
  background: #2fcf2f;
  background: linear-gradient(to bottom, #2fcf2f 0%, #4fb96b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
