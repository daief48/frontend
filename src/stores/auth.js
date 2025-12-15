import { defineStore } from 'pinia';
import api from '../api/axios'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    init() {
      if (this.token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
    },

    async login(email, password) {
      try {
        const res = await api.post('/login', { email, password });
        this.user = res.data.user;
        this.token = res.data.token;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } catch (err) {
        throw new Error(err.response?.data?.error || 'Login failed');
      }
    },

async register(name, email, password, password_confirmation) {
  try {
    const res = await api.post('/register', {
      name: name.toString(),           
      email: email.toString(),
      password: password.toString(),
      password_confirmation: password_confirmation.toString(),
    });
    
    this.user = res.data.user;
    this.token = res.data.token;

    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify(this.user));
    api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  } catch (err) {
    if (err.response?.data?.errors) {
      console.log(err.response.data.errors);
      throw err.response.data.errors;
    } else {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  }
},

    async logout() {
      try {
        await api.post('/logout');
      } catch (err) {
        console.log(err);
      } finally {
        this.user = null;
        this.token = null;

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        delete api.defaults.headers.common['Authorization'];
      }
    },
  },
});
