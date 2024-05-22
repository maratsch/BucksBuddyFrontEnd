<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import type { Expenditure } from '@/Expenditure.ts';

// Typisieren als Ref<Expenditure[]> für die reaktive Referenz
const expenditures = inject<Ref<Expenditure[]>>('expensesList');

// Computed property to sum the expenses
const totalExpenditures = computed(() => {
  // Explizite Typangaben im Callback
  return expenditures?.value.reduce((sum: number, expenditure: Expenditure) => sum + expenditure.amount, 0) || 0;
});
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
          <h4>€ 600</h4>
        </div>
      </div>

      <hr>
      <div class="row">
        <div class="col text-start">
          <h3>Total Expenses</h3>
        </div>
        <div class="col text-end">
          <h3>€ {{ totalExpenditures }}</h3
