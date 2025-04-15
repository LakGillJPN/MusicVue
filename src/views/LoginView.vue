<template lang="">
  <div class="flex flex-col gap-8 text-xl m-10 max-w-md mx-auto">
    <h1 class="text-2xl font-bold">Login</h1>

    <div v-if="message" class="text-red-500">{{ message }}</div>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
      <label class="flex flex-col">
        Email
        <input
          type="email"
          v-model="email"
          class="border p-2 rounded"
          required
        />
      </label>

      <label class="flex flex-col">
        Password
        <input
          type="password"
          v-model="password"
          class="border p-2 rounded"
          required
        />
      </label>

      <button
        type="submit"
        class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Log In
      </button>
    </form>
  </div>
</template>

<script setup lang0>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const message = ref('')

const handleLogin = () => {
  if (email.value === '' || password.value === '') {
    message.value = 'Please fill in all fields.'
    return
  }

  // Fake login logic for now
  if (email.value === 'test@example.com' && password.value === 'password') {
    message.value = 'Login successful!'
  } else {
    message.value = 'Invalid credentials.'
  }
}
</script>
