<script setup lang="ts">
import { onMounted, ref, defineProps, watch } from 'vue';
import type { Expenditure } from '@/Expenditure';
import apiClient from '@/services/api';

// Define props to receive the expenditures list from the parent
const props = defineProps<{ expenditures: Expenditure[] }>();

// Reactive reference for local expenditures list
const expendituresList = ref<Expenditure[]>(props.expenditures);

// Watch for changes in props.expenditures and update local expendituresList
watch(
    () => props.expenditures,
    (newExpenditures) => {
      expendituresList.value = newExpenditures;
    },
    { deep: true }
);

const deleteExpenditure = async (id: number) => {
  try {
    await apiClient.delete(`/expenditure?id=${id}`);
    // Remove the deleted expenditure from the list
    expendituresList.value = expendituresList.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting expenditure:', error);
  }
};

// Function to format the amount to 2 digits and the selected currency
function formatCurrency(amount: number, currency: string): string {
  return amount.toFixed(2) + ' ' + currency;
}
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
            {{ formatCurrency(item.amount, item.currency) }}
          </div>
          <div class="col-3 text-center">
            {{ item.person }}
          </div>
          <div class="col-3 d-flex justify-content-end">
            <button class="btn bi bi-pencil-square text-dark fs-5" title="edit"></button>
            <button class="btn bi bi-trash text-dark fs-5" title="delete" @click="deleteExpenditure(item.id)"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
