<template> 
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="submit" class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">Register</h2>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Name</label>
        <input v-model="name" type="text" placeholder="Enter your name"
          class="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Email</label>
        <input v-model="email" type="email" placeholder="Enter your email"
          class="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-1">Password</label>
        <input v-model="password" type="password" placeholder="Enter your password"
          class="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 font-medium mb-1">Confirm Password</label>
        <input v-model="password_confirmation" type="password" placeholder="Confirm your password"
          class="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
      </div>

      <button type="submit"
        class="bg-indigo-600 text-white font-semibold p-3 w-full rounded-md hover:bg-indigo-700 transition">
        Register
      </button>

      <p class="mt-4 text-center text-gray-500">
        Already have an account? 
        <router-link to="/login" class="text-indigo-600 hover:underline">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const errors = reactive({});

const submit = async () => {
  Object.keys(errors).forEach(key => delete errors[key]);

  try {
    await auth.register(name.value, email.value, password.value, password_confirmation.value);
    router.push('/'); 
  } catch (e) {
    if (e && typeof e === 'object') {
      Object.assign(errors, e);
    } else {
      alert('Registration failed. Check your inputs.');
    }
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
