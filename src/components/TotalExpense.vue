<script setup lang="ts">
import { inject, computed } from 'vue';

// Die Ausgabenliste injizieren, die von der übergeordneten Komponente bereitgestellt wird
const expenses = inject('expensesList');

// Berechnete Eigenschaft zur Summierung der Ausgaben
const totalExpenses = computed(() => {
  if (!expenses || !expenses.value) {
    return 0;
  }
  return expenses.value.reduce((sum, expense) => sum + expense.amount, 0);
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
          <!-- Dynamisches Binden der Gesamtsumme -->
          <h3>€ {{ totalExpenses }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
