<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import apiClient from '@/services/api';
import type { Expenditure } from '@/Expenditure';

const title = ref('');
const amount = ref<number | null>(null);
const currency = ref('EUR');
const person = ref('');
const today = new Date().toISOString().slice(0, 10);
const date = ref(today);

const emits = defineEmits(['expense-added']);

const addExpenditure = async () => {
  if (title.value && amount.value !== null && currency.value && person.value) {
    const newExpenditure: Expenditure = {
      id: 0,
      name: title.value,
      amount: amount.value,
      person: person.value,
      currency: currency.value
    };

    try {
      const response = await apiClient.post('/expenditure', newExpenditure);
      emits('expense-added', response.data);
      // Optionally, clear the form fields after successful submission
      title.value = '';
      amount.value = null;
      currency.value = 'EUR';
      person.value = '';
    } catch (error) {
      console.error('Error creating expenditure:', error);
    }
  } else {
    console.error('Please fill in all fields');
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
          <label for="personInput" class="form-label">Person</label>
          <input type="text" class="form-control" id="personInput" v-model="person" @keyup.enter="addExpenditure">
        </div>
        <div class="col">
          <label for="currencyInput" class="form-label">Currency</label>
          <input type="text" class="form-control" id="currencyInput" v-model="currency" @keyup.enter="addExpenditure">
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
