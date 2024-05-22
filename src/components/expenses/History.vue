<script setup lang="ts">
import { ref, onMounted, defineExpose } from 'vue';
import api from '@/services/api';
import { type Expenditure } from '@/Expenditure';

const expendituresList = ref<Expenditure[]>([]);

const fetchExpenditures = async () => {
  try {
    const response = await api.getExpenditures();
    expendituresList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteExpenditure = async (id: number) => {
  try {
    await api.deleteExpenditure(id);
    fetchExpenditures(); // Refresh the list after deletion
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchExpenditures();
});

defineExpose({
  fetchExpenditures
});
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
            {{ new Date(item.date).toLocaleDateString() }}
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
