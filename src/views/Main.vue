<script setup lang="ts">
import { ref } from 'vue';
import TotalExpenditures from "@/components/expenses/TotalExpenditures.vue";
import History from "@/components/expenses/History.vue";
import InputForm from "@/components/expenses/InputForm.vue";

const historyComponent = ref();

const handleRefreshExpenditures = () => {
  if (historyComponent.value) {
    historyComponent.value.fetchExpenditures();
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col col-md-6">
        <total-expenditures />
        <input-form @refreshExpenditures="handleRefreshExpenditures" />
      </div>
      <div class="col col-md-6">
        <history ref="historyComponent" />
      </div>
    </div>
  </div>
</template>

