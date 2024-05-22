<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';
import { type Expenditure } from '@/Expenditure';

const title = ref('');
const amount = ref<number | null>(null);
const date = ref<string>('');

const addExpenditure = async () => {
  if (title.value && amount.value !== null && date.value) {
    const newExpenditure: Omit<Expenditure, 'id'> = {
      name: title.value,
      amount: amount.value,
      date: new Date(date.value)
    };
    try {
      await api.createExpenditure(newExpenditure);
      title.value = '';
      amount.value = null;
      date.value = '';
      // Optionally, emit an event to refresh the expenditures list in History component
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<template>
  <div class="card shadow mb-3">
    <div class="card-body">
      <h3 class="card-title">New Expense</h3>

      <div class="row mb-2">
        <div class="col">
          <label for="titleInput" class="form-label">Title</label>
          <input type="text" class="form-control" id="titleInput" v-model="title" @keyup.enter="addExpenditure">
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <label for="amountInput" class="form-label">Amount</label>
          <input type="number" class="form-control" id="amountInput" v-model.number="amount" @keyup.enter="addExpenditure">
        </div>
        <div class="col">
          <label for="dateInput" class="form-label">Date</label>
          <input type="date" class="form-control" id="dateInput" v-model="date" @keyup.enter="addExpenditure">
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <button type="button" class="btn btn-primary" @click="addExpenditure">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
