<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const theme = ref('light'); // Standardmäßig auf 'light' setzen

const applyTheme = (theme: string) => {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Standardmäßig auf 'light' setzen
  theme.value = savedTheme;
  applyTheme(savedTheme);
};

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

const saveTheme = (newTheme: string) => {
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
};

onMounted(() => {
  loadTheme();
});

watch(theme, (newTheme) => {
  saveTheme(newTheme);
});
</script>

<template>
  <nav class="navbar shadow mb-3 navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <div class="col d-flex align-items-center">
        <RouterLink to="/main">
          <img src="@/assets/logo2.png" alt="Bootstrap" style="width: auto; height: 70px;">
        </RouterLink>
      </div>
      <ul class="navbar-nav ms-auto align-self-center">
        <li class="nav-item">
          <RouterLink to="/newjourney" :class="theme === 'light' ? 'text-dark' : 'text-light'" class="bi bi-plus-lg m-2 fs-3" title="Create a new Journey"></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/main" :class="theme === 'light' ? 'text-dark' : 'text-light'" class="bi bi-card-list m-2 fs-3" title="Main"></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/settings" :class="theme === 'light' ? 'text-dark' : 'text-light'" class="bi bi-gear m-2 fs-3" title="Settings"></RouterLink>
        </li>
        <li class="nav-item d-flex align-items-center ms-3">
          <i class="bi bi-sun fs-3" v-if="theme === 'light'"></i>
          <i class="bi bi-moon-stars fs-3" v-if="theme === 'dark'"></i>
          <i class="bi fs-3 mx-2" :class="theme === 'light' ? 'bi-toggle-off' : 'bi-toggle-on' " @click="toggleTheme"></i>
        </li>
      </ul>
    </div>
  </nav>
</template>
