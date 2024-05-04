<script setup lang="ts">
import profile from "../views/Profile.vue"
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <div class="col d-flex align-items-center">
        <RouterLink to="/"><img src="@/assets/logo2.png" alt="Bootstrap" style="width: auto; height: 70px;"></RouterLink>
        <h1 class="ms-3 fw-bold">Bucks Buddy</h1>
      </div>
      <ul class="navbar-nav ms-auto align-self-center">
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
        <li class="nav-item">
          <RouterLink to="/profile"><img src="@/assets/images.png" alt="Bootstrap" style="width: auto; height: 40px;"></RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

