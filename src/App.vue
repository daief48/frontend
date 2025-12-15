<template>
  <div id="app" class="min-h-screen bg-gray-100 font-sans flex flex-col">
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-indigo-600">InventoryApp</router-link>
        
        <button 
          @click="menuOpen = !menuOpen" 
          class="md:hidden text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="hidden md:flex space-x-4 items-center">
          <router-link v-if="!auth.user" to="/login" class="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">Login</router-link>
          <router-link v-if="!auth.user" to="/register" class="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">Register</router-link>
          <router-link v-if="auth.user" to="/categories" class="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">Categories</router-link>
          <router-link v-if="auth.user" to="/products" class="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">Products</router-link>
          <button v-if="auth.user" @click="logout" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">Logout</button>
        </div>
      </div>

      <div v-if="menuOpen" class="md:hidden bg-white shadow-inner">
        <router-link v-if="!auth.user" to="/login" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">Login</router-link>
        <router-link v-if="!auth.user" to="/register" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">Register</router-link>
        <router-link v-if="auth.user" to="/categories" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">Categories</router-link>
        <router-link v-if="auth.user" to="/products" class="block px-6 py-3 text-gray-700 hover:bg-gray-100">Products</router-link>
        <button v-if="auth.user" @click="logout" class="w-full text-left px-6 py-3 text-red-500 hover:bg-gray-100">Logout</button>
      </div>
    </nav>

    <main class="container mx-auto px-6 py-10 flex-1">
      <router-view />
    </main>

    <footer class="bg-white shadow-inner mt-auto">
      <div class="container mx-auto px-6 py-6 text-center text-gray-500 text-sm">
        &copy; 2025 InventoryApp. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const menuOpen = ref(false);

const logout = async () => {
  try {
    await auth.logout();
    router.push('/login');
    menuOpen.value = false; 
  } catch (err) {
    alert('Logout failed');
  }
};
</script>
