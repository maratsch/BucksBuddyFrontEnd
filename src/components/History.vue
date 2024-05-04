<script setup lang="ts">
import {inject} from "vue";
import type {Expense} from "./InputForm.vue";


const expensesList = inject<Expense[]>('expensesList');

function formatCurrency(amount: number, currency: string): string {
  return amount.toFixed(2) + ' ' + currency;
}

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">History</h3>
      <div class="card mb-2"
           v-for="item in expensesList"
           :key="item.title">
        <div class="card-body d-flex">
          <div class="col-4">
            <p class="card-title fw-bold">{{ item.title }}</p>
          </div>
          <div class="col-4">
            <p class="card-text text-center">{{ formatCurrency(item.amount, item.currency) }}</p>
          </div>
          <div class="col-4">
            <p class="card-text text-end">{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

