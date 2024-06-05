<!--src/components/expenses/InputForm.vue-->

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue';
import api from '@/services/api';
import { type Expenditure } from '@/Expenditure';

const title = ref('');
const amount = ref<number | null>(null);
const date = ref<string>('');

const emit = defineEmits(['refreshExpenditures']);



// Function to set the date to today's date
const setDateToToday = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  date.value = `${year}-${month}-${day}`;
};

// Function to add an expenditure
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
      setDateToToday();
      emit('refreshExpenditures');


      await api.getExpenditures();
    } catch (error) {
      console.error(error);
    }
  }
};


// Lifecycle hook that runs when the component is mounted
onMounted(async () => {
  try {
    const response = await api.getExpenditures();
    console.log('GET request response:', response.data);
  } catch (error) {
    console.error('Error during GET request:', error);
  }

  setDateToToday();
});
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
          <label for="exchangeRateDisplay" class="form-label">Exchange Rate:</label>
          <span id="exchangeRateDisplay"></span>
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
