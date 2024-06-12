<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { type Expenditure } from '@/types';
import eventBus from '@/services/eventBus'; // Import EventBus

const expendituresList = ref<Expenditure[]>([]);
const journeyId = ref<number | null>(Number(localStorage.getItem('selectedJourney')));

const fetchExpenditures = async (id: number) => {
  try {
    const response = await api.getAllExpenditures(id);
    expendituresList.value = response.data.map((expenditure: Expenditure) => ({
      ...expenditure,
      isEditing: false,
    }));
  } catch (error) {
    console.error('Error fetching expenditures:', error);
  }
};

const clearExpenditures = () => {
  expendituresList.value = [];
};

const deleteExpenditure = async (id: number) => {
  try {
    await api.deleteExpenditure(journeyId.value!, id);
    await fetchExpenditures(journeyId.value!);
  } catch (error) {
    console.error(error);
  }
};

const editExpenditure = async (id: number) => {
  try {
    const response = await api.getExpenditureById(journeyId.value!, id);
    const expenditure = response.data;
    expenditure.isEditing = true;
    const index = expendituresList.value.findIndex(item => item.id === id);
    if (index !== -1) {
      expendituresList.value[index] = expenditure;
    }
  } catch (error) {
    console.error(error);
  }
};

const saveExpenditure = async (id: number, updatedExpenditure: Expenditure) => {
  try {
    await api.updateExpenditure(journeyId.value!, id, updatedExpenditure);
    await fetchExpenditures(journeyId.value!);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  eventBus.on('journeyIdChanged', (newJourneyId: number | null) => {
    console.log('journeyId changed:', newJourneyId);
    if (newJourneyId !== null) {
      journeyId.value = newJourneyId;
      fetchExpenditures(newJourneyId);
    } else {
      clearExpenditures();
    }
  });

  if (journeyId.value !== null) {
    console.log('journeyId in History:', journeyId.value);
    fetchExpenditures(journeyId.value);
  }
});

defineExpose({
  fetchExpenditures
});

const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const formatAmount = (amount: number): string => {
  return amount.toFixed(2);
};
</script>

<template>
  <div class="card shadow mb-3">
    <div class="card-body">
      <h3 class="card-title">History</h3>
      <div class="historycard shadow-sm mb-2" v-for="item in expendituresList" :key="item.id">
        <div class="historycard-body d-flex align-items-center p-1 ms-2">

          <div class="col-3 fw-bold" v-if="!item.isEditing">
            {{ item.name }}
          </div>
          <div class="col-3" v-else>
            <input v-model="item.name" class="form-control"/>
          </div>

          <div class="col-3 text-center" v-if="!item.isEditing">
            {{ formatAmount(item.amount) }} EUR
          </div>
          <div class="col-3" v-else>
            <input v-model="item.amount" type="number" class="form-control ms-2"/>
          </div>

          <div class="col-3 text-center" v-if="!item.isEditing">
            {{ formatDate(item.date) }}
          </div>
          <div class="col-3" v-else>
            <input v-model="item.date" type="date" class="form-control ms-3"/>
          </div>

          <div class="col-3 d-flex justify-content-end">
            <button
                class="btn bi bi-pencil-square fs-5"
                title="edit"
                v-if="!item.isEditing"
                @click="editExpenditure(item.id)">
            </button>
            <button
                class="btn bi bi-save fs-5"
                title="save"
                v-else
                @click="saveExpenditure(item.id, item)">
            </button>
            <button
                class="btn bi bi-trash fs-5"
                title="delete"
                @click="deleteExpenditure(item.id)">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.historycard {
  background-color: var(--bs-body-bg);
  border: 1px solid; /* Fügt einen festen Rahmen hinzu */
  border-color: var(--bs-border-color); /* Setzt die Rahmenfarbe */
  border-radius: 5px;
}
</style>
