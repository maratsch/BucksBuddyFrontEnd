<script setup lang="ts">
import {ref} from 'vue';

const title = ref('');
const amount = ref(null);
const currency = ref('EUR');
const today = new Date().toISOString().slice(0, 10);
const date = ref(today);
const emit = defineEmits(['new-expense']);

/*
Interface for Expense
var:
title as string
amount as number
date as string
currency as string
 */
export interface Expense {
  title: string;
  amount: number;
  date: string;
  currency: string; // Falls die Währung ebenfalls Teil der Ausgabe ist
}

/*
addExpense function
If title, amount and date are given, a new Expense of the type Expense will be created
It is emitted and then all the Blanks are resetted
if not all of the above are given, an error will be displayed
 */
function addExpense() {
  if (title.value && amount.value && date.value) {
    const newExpense: Expense = {
      title: title.value,
      amount: parseFloat(amount.value),
      date: date.value,
      currency: currency.value,
      //TODO: ADD Currency-API and database connection to fetch the currency rate and home currency of the user to calc. the expense
      //TODO: ADD distinction between paid currency and home currency
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
  <div class="card shadow mb-3">
    <div class="card-body">
      <h3 class="card-title">New Expense</h3>

      <div class="row mb-2">
        <div class="col">
          <label for="titleInput" class="form-label">Title</label>
          <input type="text" class="form-control" id="titleInput" v-model="title">
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <label for="amountInput" class="form-label">Amount</label>
          <input type="number" class="form-control" id="amountInput" v-model.number="amount">
        </div>
        <div class="col">
          <label for="dateInput" class="form-label">Date</label>
          <input type="date" class="form-control" id="dateInput" v-model="date">
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <button type="button" class="btn btn-primary"
                  @click="addExpense">Add New Expense</button>
        </div>
      </div>
    </div>
  </div>
</template>
