<script setup lang="ts">
import {ref} from 'vue';

const title = ref('');
const amount = ref(null);
const currency = ref('EUR');
const today = new Date().toISOString().slice(0, 10);
const date = ref(today);

const emit = defineEmits(['new-expense']);

function addExpense() {
  if (title.value && amount.value && date.value) {
    const newExpense = {
      title: title.value,
      amount: parseFloat(amount.value),
      date: date.value,
      currency: currency.value,
    };

    emit('new-expense', newExpense);

    title.value = '';
    amount.value = null;
    date.value = today;
    currency.value = 'EUR'; //TODO: Hier später die Währung aus dem Profil abholen
  } else {
    alert("Please fill all fields.");
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">New Expense</h4>
      <div class="mb-2">
        <label for="titleInput" class="form-label">Title</label>
        <input type="text" class="form-control" id="titleInput" v-model="title">
      </div>
      <div class="row">
        <div class="col mb-2">
          <label for="amountInput" class="form-label">Amount</label>
          <input type="number" class="form-control" id="amountInput" v-model.number="amount">
        </div>
        <div class="col mb-2">
          <label for="dateInput" class="form-label">Choose the currency</label>
          <select class="form-select" id="currencySelect" v-model="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <div class="col mb-2">
          <label for="dateInput" class="form-label">Date</label>
          <input type="date" class="form-control" id="dateInput" v-model="date">
        </div>
      </div>
      <button type="button" class="btn btn-primary mb-2" @click="addExpense">Add New Expense</button>
    </div>
  </div>
</template>
