<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import api from '@/services/api';
import { type Expenditure } from '@/Expenditure';

// Defines a reactive reference to hold the list of expenditures
const expendituresList = ref<Expenditure[]>([]);

// Asynchronously fetches expenditures from the API and updates the expenditures list
const fetchExpenditures = async () => {
  try {
    const response = await api.getExpenditures();
    expendituresList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

// Asynchronously deletes an expenditure by its ID and refreshes the expenditures list
const deleteExpenditure = async (id: number) => {
  try {
    await api.deleteExpenditure(id);
    fetchExpenditures();
  } catch (error) {
    console.error(error);
  }
};

// Lifecycle hook that fetches expenditures when the component is mounted
onMounted(() => {
  fetchExpenditures();
});

// Exposes the fetchExpenditures method to the component's instance
defineExpose({
  fetchExpenditures
});

// Formats a date string into the format 'DD.MM.YYYY'
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
</script>

<template>
  <div class="card shadow mb-3">
    <div class="card-body">
      <h3 class="card-title">History</h3>
      <div class="card mb-2" v-for="item in expendituresList" :key="item.id">
        <div class="card-body d-flex align-items-center">
          <div class="col-3 fw-bold">
            {{ item.name }}
          </div>
          <div class="col-3 text-center">
            {{ item.amount }}
          </div>
          <div class="col-3 text-center">
            {{ formatDate(item.date) }}
          </div>
          <div class="col-3 d-flex justify-content-end">
            <button class="btn bi bi-pencil-square text-dark fs-5" title="edit">
            </button>
            <button class="btn bi bi-trash text-dark fs-5" title="delete" @click="deleteExpenditure(item.id)">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
