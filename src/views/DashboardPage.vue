<template>
  <div class="container mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <router-link
        to="/categories"
        class="bg-green-500 text-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center"
      >
        <div class="text-4xl font-bold mb-2">📂</div>
        <div class="text-xl font-semibold">Categories</div>
      </router-link>

      <router-link
        to="/products"
        class="bg-blue-500 text-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center"
      >
        <div class="text-4xl font-bold mb-2">🛒</div>
        <div class="text-xl font-semibold">Products</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
