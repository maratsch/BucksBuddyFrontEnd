<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const loginData = reactive({
  email: '',
  password: ''
});

const login = async () => {
  try {
    const response = await api.login(loginData.email, loginData.password);
    console.log('Login successful:', response.data);

    // Speichere die UUID im Local Storage
    localStorage.setItem('UUID', response.data.uuid);

    router.push('/main'); // Weiterleitung zur Hauptseite nach erfolgreichem Login
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
};
</script>

<template>
        <div class="card shadow m-3">
          <div class="card-body">
            <div class="d-flex justify-content-center align-items-center">
              <img src="@/assets/logo.png" alt="Bootstrap" style="width: auto; height: auto;">
            </div>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="loginData.email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="loginData.password" required>
              </div>
              <div class="text-center mb-3">
                <button type="submit" class="btn btn-primary custom-width">Log in</button>
              </div>
            </form>
            <hr>
            <div class="text-center">
              <a href="#/newpassword" class="text-decoration-none">Can't remember password</a>
            </div>
            <div class="text-center mt-3">
              <a href="#/signup" class="btn btn-secondary custom-width">Sign up</a>
            </div>
          </div>
        </div>
</template>

<style scoped>
.custom-width {
  width: 33%;
}
</style>
