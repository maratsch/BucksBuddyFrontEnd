<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore';
const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.applyTheme(themeStore.theme === 'light' ? 'dark' : 'light');
};
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
          <RouterLink to="/newjourney"
                      class="bi bi-plus-lg m-2 fs-3 icon-link-hover"
                      title="Create a new Journey">
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/main"
                      class="bi bi-card-list m-2 fs-3 icon-link-hover"
                      title="Main">
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/settings"
                      class="bi bi-gear m-2 fs-3 icon-link-hover"
                      title="Settings">
          </RouterLink>
        </li>
        <li class="nav-item ms-5 d-flex align-items-center">
          <i :class="themeStore.theme === 'light' ? 'bi bi-sun fs-3' : 'bi bi-moon-stars fs-3'"></i>
          <i :class="themeStore.theme === 'light' ? 'bi bi-toggle-off fs-3 mx-2' : 'bi bi-toggle-on fs-3 mx-2'" @click="toggleTheme"></i>
        </li>
      </ul>
    </div>
  </nav>
</template>
