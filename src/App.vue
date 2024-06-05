<!--src/App.vue-->

<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from "@/components/NavBar.vue";

const route = useRoute();
const isLoginPage = route.path === '/login';
</script>

<template>
  <div class="main-content">
    <NavBar v-if="!isLoginPage" />
    <router-view />
  </div>
</template>

