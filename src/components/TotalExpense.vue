<script setup lang="ts">
import { inject, computed } from 'vue';
import type {Expense} from "./InputForm.vue";

const expenses = inject<Expense[]>('expensesList');

// Computed property to sum the expenses
const totalExpenses = computed(() => {
  return expenses?.value.reduce((sum, expense) => sum + expense.amount, 0) || 0; //TODO Wenn ich value lösche gehen alle fehler weg, aber website ist dann quasi leer??
  //TODO: Add connection to database to fetch the total expenses of the current user
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
</template>>
