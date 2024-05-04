<script setup lang="ts">

</script>

<template>
  <div class="card">
    <div class="card-body">
  <label for="dateInput" class="form-label">In which currency do you want to convert your expenses?</label>
  <select class="form-select" id="currencySelect" v-model="currency"> <!-- TODO: ADD connection to database -->
    <option value="EUR">EUR</option>
    <option value="USD">USD</option>
    <option value="JPY">JPY</option>
  </select> <!-- TODO: Dont understand why the select is empty by default and the select in InputForm isn't-->
  </div>
  </div>
</template>

<style scoped>

</style>