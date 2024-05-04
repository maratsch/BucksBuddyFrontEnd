<script setup lang="ts">

import TotalExpense from "@/components/TotalExpense.vue";
import History from "@/components/History.vue";
import ChooseCurrency from "@/components/ChooseCurrency.vue";
</script>
<!-- TODO: ADD Name and other vars-->

<template>

  <div class="container">

    <div class="row">
    <div class="col col-md-6">
      <total-expense />
      <choose-currency />
    </div>
    <div class="col col-md-6">
      <history />
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>