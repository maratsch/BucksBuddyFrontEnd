<script setup lang="ts">
import {inject} from "vue";
import type {Expense} from "./InputForm.vue";


const expensesList = inject<Expense[]>('expensesList');

/*
Method to format the amount to 2 digits and the selected currency
 */
function formatCurrency(amount: number, currency: string): string {
  return amount.toFixed(2) + ' ' + currency;
}

</script>

<template>
  <div class="card shadow mb-3">
    <div class="card-body">
      <h3 class="card-title">History</h3>
      <div class="card mb-2"
           v-for="item in expensesList"
           :key="item.title">
        <div class="card-body d-flex align-items-center">
          <div class="col-3 fw-bold">
            {{ item.title }}
          </div>
          <div class="col-3 text-center">
            {{ formatCurrency(item.amount, item.currency) }}
          </div>
          <div class="col-3 text-center">
            {{ item.date }}
          </div>
          <div class="col-3 d-flex justify-content-end">
            <button class="btn bi bi-pencil-square text-dark fs-5" title="edit">
            </button>
            <button class="btn bi bi-trash text-dark fs-5" title="delete">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


