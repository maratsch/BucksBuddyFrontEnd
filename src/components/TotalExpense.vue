<script setup lang="ts">
import { inject, computed } from 'vue';

const expenses = inject('expensesList');

// Computed property to sum the expenses
const totalExpenses = computed(() => {
  return expenses?.value.reduce((sum, expense) => sum + expense.amount, 0) || 0;
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col text-start">
          <h3>Total Expenses</h3>
        </div>
        <div class="col text-end">
          <h3>€ {{ totalExpenses }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

