<template>
  <div class="container mx-auto px-4 sm:px-6 py-10">
    <h1 class="text-3xl font-extrabold mb-8 text-gray-900 text-center sm:text-left">Categories</h1>

    <div class="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        v-model="newCategory"
        placeholder="New category"
        class="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
      />
      <button
        @click="submitCategory"
        class="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg hover:from-green-500 hover:to-green-700 shadow-md transition w-full sm:w-auto font-semibold"
      >
        {{ editCategoryId ? 'Update Category' : 'Add Category' }}
      </button>
      <button
        v-if="editCategoryId"
        @click="cancelEdit"
        class="bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto font-semibold"
      >
        Cancel
      </button>
    </div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <li
        v-for="category in categories"
        :key="category.id"
        class="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <span class="text-gray-800 font-medium text-lg">{{ category.name }}</span>
        <div class="flex gap-3 mt-3 sm:mt-0 w-full sm:w-auto">
          <button
            @click="editCategory(category)"
            class="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Edit
          </button>
          <button
            @click="deleteCategory(category.id)"
            class="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const categories = ref([]);
const newCategory = ref('');
const editCategoryId = ref(null);

const fetchCategories = async () => {
  try {
    const res = await api.get('/categories');
    categories.value = res.data;
  } catch (err) {
    alert('Failed to fetch categories');
  }
};

const submitCategory = async () => {
  if (!newCategory.value.trim()) return;

  try {
    if (editCategoryId.value) {
      const res = await api.put(`/categories/${editCategoryId.value}`, { name: newCategory.value });
      const index = categories.value.findIndex(c => c.id === editCategoryId.value);
      if (index !== -1) categories.value[index] = res.data;
      editCategoryId.value = null;
    } else {
      const res = await api.post('/categories', { name: newCategory.value });
      categories.value.push(res.data);
    }
    newCategory.value = '';
  } catch (err) {
    alert('Failed to submit category');
  }
};

const editCategory = (category) => {
  newCategory.value = category.name;
  editCategoryId.value = category.id;
};

const cancelEdit = () => {
  newCategory.value = '';
  editCategoryId.value = null;
};

const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);
    categories.value = categories.value.filter(c => c.id !== id);
  } catch (err) {
    alert('Failed to delete category');
  }
};

onMounted(fetchCategories);
</script>
