<script setup lang="ts">
</script>

<template>
  <nav class="navbar shadow mb-3 navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <div class="col d-flex align-items-center">
        <RouterLink to="/main"><img src="@/assets/logo2.png" alt="Bootstrap" style="width: auto; height: 70px;"></RouterLink>
      </div>
      <ul class="navbar-nav ms-auto align-self-center">
        <li class="nav-item">
          <RouterLink to="/newjourney" class="bi bi-plus-lg m-2 text-dark fs-3" title="Create a new Journey">
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/main" class="bi bi-card-list m-2 text-dark fs-3" title="Main">
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/settings" class="bi bi-gear m-2 text-dark fs-3" title="Settings">
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
