<script setup lang="ts">
import TotalExpenditures from "@/components/expenses/TotalExpenditures.vue";
import History from "@/components/expenses/History.vue";
import InputForm from "@/components/expenses/InputForm.vue";
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col col-md-6">
        <total-expenditures />
        <input-form />
      </div>
      <div class="col col-md-6">
        <history />
      </div>
    </div>
  </div>
</template>
