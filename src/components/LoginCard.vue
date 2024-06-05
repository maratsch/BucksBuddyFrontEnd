<!--src/components/LoginCard.vue-->

<template>
  <div class="card shadow m-3">
    <div class="card-body">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <h2 class="text-center mb-4">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-primary">Log in</button>
            </div>
          </form>
          <div class="text-center">
            <a href="#" class="text-decoration-none">Can't remember password</a>
          </div>
          <div class="text-center mt-3">
            <button class="btn btn-secondary">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import api from '@/services/api';

export default defineComponent({
  setup() {
    const loginData = reactive({
      email: '',
      password: ''
    });

    const login = async () => {
      try {
        const response = await api.login({
          email: loginData.email,
          password: loginData.password
        });
        console.log('Login successful:', response.data);
        // Handle successful login, e.g., store token, redirect, etc.
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    };

    return {
      ...loginData,
      login
    };
  }
});
</script>

<style scoped>
/* Add any specific styles for your component here */
</style>


