<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import type { Expense } from "./InputForm.vue";

// Typisieren als Ref<Expense[]> für die reaktive Referenz
const expenses = inject<Ref<Expense[]>>('expensesList');

// Computed property to sum the expenses
const totalExpenses = computed(() => {
  // Explizite Typangaben im Callback
  return expenses?.value.reduce((sum: number, expense: Expense) => sum + expense.amount, 0) || 0;
});   //TODO: Add connection to database to fetch the total expenses of the current user
</script>

<template>
  <div class="card shadow mb-3">
    <div class="card-body">
      <div class="row">
        <div class="col text-start">
          <h3>Journey</h3>
        </div>
        <div class="col text-end">
          <select class="form-select">
            <option disabled value="">Please select one</option>
            <option value="thailand">Thailand</option>
            <option value="japan">Japan</option>
            <option value="france">France</option>
            <option value="brazil">Brazil</option>
          </select>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col text-start">
          <h4>Home Currency</h4>
        </div>
        <div class="col text-end">
          <h4>EUR</h4>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Vacation Currency</h4>
        </div>
        <div class="col text-end">
          <h4>USD</h4>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Budget</h4>
        </div>
        <div class="col text-end">
          <h4>€ 29</h4>
        </div>
      </div>

      <hr>
      <div class="row">
        <div class="col text-start">
          <h3>Total Expenses</h3>
        </div>
        <div class="col text-end">
          <h3>€ {{ totalExpenses }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Budget Left</h4>
        </div>
        <div class="col text-end">
          <h4>€ {{ totalExpenses }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
