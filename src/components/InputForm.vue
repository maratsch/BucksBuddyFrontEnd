<script setup lang="ts">
import {ref} from 'vue';

// Reaktive Referenzen für die Formulardaten
const title = ref('');
const amount = ref(null);
const today = new Date().toISOString().slice(0, 10);
const date = ref(today);

// Event emittieren definieren
const emit = defineEmits(['new-expense']);

// Methode zum Hinzufügen eines neuen Eintrags
function addExpense() {
  if (title.value && amount.value && date.value) {
    // Erstelle ein neues Expense-Objekt
    const newExpense = {
      title: title.value,
      amount: parseFloat(amount.value), // Umwandlung in eine Zahl
      date: date.value
    };

    // Emitte das Ereignis mit dem neuen Ausgabenobjekt
    emit('new-expense', newExpense);

    // Formularfelder zurücksetzen
    title.value = '';
    amount.value = null;
    date.value = today;
  } else {
    alert("Bitte füllen Sie alle Felder aus.");
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
          <label for="dateInput" class="form-label">Date</label>
          <input type="date" class="form-control" id="dateInput" v-model="date">
        </div>
      </div>
      <button type="button" class="btn btn-primary mb-2" @click="addExpense">Add New Expense</button>
    </div>
  </div>
</template>
