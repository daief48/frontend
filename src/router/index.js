import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import CategoryPage from '../views/CategoryPage.vue';
import ProductPage from '../views/ProductsPage.vue';

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/', component: DashboardPage },
  { path: '/categories', component: CategoryPage },
  { path: '/products', component: ProductPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
