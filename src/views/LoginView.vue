<template lang="">
    <div class="flex flex-col gap-8 text-xl m-10">
      Login
      <div v-if="message">{{ message }}</div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: '',
      };
    },
    mounted() {
      this.fetchMessage();
    },
    methods: {
      async fetchMessage() {
        try {
          const response = await axios.get('http://localhost/php-project/api/test.php');
          this.message = response.data.message;
        } catch (error) {
          console.error('Error fetching message:', error);
        }
      },
    },
  };
  </script>
  
  <style lang="">
  </style>
  