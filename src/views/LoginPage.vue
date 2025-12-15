<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="submit" class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">Login</h2>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Email</label>
        <input 
          v-model="email" 
          type="email" 
          placeholder="Enter your email"
          class="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 font-medium mb-1">Password</label>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Enter your password"
          class="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
      </div>

      <button 
        type="submit" 
        class="bg-indigo-600 text-white font-semibold p-3 w-full rounded-md hover:bg-indigo-700 transition"
      >
        Login
      </button>

      <p class="mt-4 text-center text-gray-500">
        Don't have an account? 
        <router-link to="/register" class="text-indigo-600 hover:underline">Register</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const router = useRouter();
const auth = useAuthStore();

const submit = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push('/');
  } catch (e) {
    alert('Login failed. Check your credentials.');
  }
};
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
