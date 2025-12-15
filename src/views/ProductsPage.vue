<template> 
  <div class="container mx-auto px-6 py-10">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Products</h1>

    <button @click="openModal()"
      class="bg-blue-500 text-white font-semibold p-3 rounded-md mb-6 hover:bg-blue-600 transition">
      Add Product
    </button>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="product in products.data" :key="product.id"
        class="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
        <img v-if="product.image" :src="`http://localhost:8000/storage/${product.image}`" alt="Product Image"
          class="h-40 w-full object-cover rounded-md mb-4" />
        <h3 class="font-semibold text-gray-800 text-lg">{{ product.name }}</h3>
        <p class="text-gray-600 mb-2">Price: ${{ product.price }}</p>
        <p class="text-gray-500 mb-2">Category: {{ product.category?.name }}</p>
        <div class="mt-auto flex gap-2">
          <button @click="openModal(product)"
            class="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition w-1/2">
            Edit
          </button>
          <button @click="deleteProduct(product.id)"
            class="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition w-1/2">
            Delete
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-2 mt-6">
      <button 
        @click="fetchProducts(products.prev_page_url)" 
        :disabled="!products.prev_page_url"
        class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Prev
      </button>
      <span class="px-3 py-1 bg-gray-100 rounded">
        Page {{ products.current_page }} of {{ products.last_page }}
      </span>
      <button 
        @click="fetchProducts(products.next_page_url)" 
        :disabled="!products.next_page_url"
        class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">{{ editProduct ? 'Edit Product' : 'Add Product' }}</h2>
        <div class="grid grid-cols-1 gap-4">
          <input v-model="form.name" placeholder="Name"
            class="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          <input v-model="form.price" type="number" placeholder="Price"
            class="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          <select v-model="form.category_id"
            class="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option disabled value="">Select Category</option>
            <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.name }}</option>
          </select>
          <div v-if="editProduct && editProduct.image" class="mb-2">
            <img :src="`http://localhost:8000/storage/${editProduct.image}`" alt="Current Image"
              class="h-32 w-full object-cover rounded-md"/>
          </div>
          <input type="file" @change="handleFile" class="border p-2 rounded-md w-full" />
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button @click="closeModal" class="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">Cancel</button>
          <button @click="submitProduct" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            {{ editProduct ? 'Update' : 'Add' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api/axios';

const products = ref({ data: [] });
const categories = ref([]);
const form = ref({ name: '', price: '', category_id: '', image: null });
const isModalOpen = ref(false);
const editProduct = ref(null);

const fetchProducts = async (url = '/products') => {
  try {
    const res = await api.get(url);
    products.value = res.data;
  } catch (err) {
    alert('Failed to fetch products');
  }
};

const fetchCategories = async () => {
  try {
    const res = await api.get('/categories');
    categories.value = res.data;
  } catch (err) {
    alert('Failed to fetch categories');
  }
};

const handleFile = (e) => form.value.image = e.target.files[0];

const openModal = (product = null) => {
  if (product) {
    editProduct.value = product;
    form.value = {
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      image: null
    };
  } else {
    editProduct.value = null;
    form.value = { name: '', price: '', category_id: '', image: null };
  }
  isModalOpen.value = true;
};

const closeModal = () => isModalOpen.value = false;

const submitProduct = async () => {
  if (!form.value.name || !form.value.price || !form.value.category_id) {
    alert('Please fill all required fields');
    return;
  }

  try {
    const data = new FormData();
    Object.keys(form.value).forEach(k => {
      if (form.value[k] !== null) data.append(k, form.value[k]);
    });

    if (editProduct.value) {
      data.append('_method', 'PUT');
      await api.post(`/products/${editProduct.value.id}`, data);
    } else {
      await api.post('/products', data);
    }

    closeModal();
    fetchProducts();
  } catch (err) {
    if (err.response?.data?.errors) {
      const messages = Object.values(err.response.data.errors).flat().join('\n');
      alert(messages);
    } else {
      alert('Failed to submit product');
    }
  }
};

const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  try {
    await api.delete(`/products/${id}`);
    fetchProducts();
  } catch (err) {
    alert('Failed to delete product');
  }
};

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>
