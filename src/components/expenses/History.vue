<script setup lang="ts">
import {ref, onMounted, defineExpose} from 'vue';
import api from '@/services/api';
import {type Expenditure} from '@/Expenditure';

// Definiert eine reaktive Referenz für die Ausgabenliste
const expendituresList = ref<Expenditure[]>([]);

// Ruft die Ausgaben asynchron von der API ab und aktualisiert die Ausgabenliste
const fetchExpenditures = async () => {
  try {
    const response = await api.getExpenditures();
    expendituresList.value = response.data.map((expenditure: Expenditure) => ({
      ...expenditure,
      isEditing: false,
    }));
  } catch (error) {
    console.error(error);
  }
};

// Löscht eine Ausgabe asynchron nach ihrer ID und aktualisiert die Ausgabenliste
const deleteExpenditure = async (id: number) => {
  try {
    await api.deleteExpenditure(id);
    fetchExpenditures();
  } catch (error) {
    console.error(error);
  }
};

// Aktiviert den Bearbeitungsmodus für eine Ausgabe und lädt die vollständige Ausgabe aus der API
const editExpenditure = async (id: number) => {
  try {
    const response = await api.getExpenditureById(id);
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

// Speichert die Änderungen und aktualisiert die Ausgabenliste
const saveExpenditure = async (id: number, updatedExpenditure: Expenditure) => {
  try {
    await api.updateExpenditure(updatedExpenditure);
    fetchExpenditures();
  } catch (error) {
    console.error(error);
  }
};

// Hook, der die Ausgaben abruft, wenn die Komponente gemountet wird
onMounted(() => {
  fetchExpenditures();
});

// Methode, die der Instanz der Komponente ausgesetzt wird
defineExpose({
  fetchExpenditures
});

// Formatiert ein Datumsobjekt im Format 'DD.MM.YYYY'
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Formatiert einen Betrag als Dezimalzahl mit zwei Nachkommastellen
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
  border: 1px solid; /* Fügt einen festen Rahmen hinzu */
  border-color: var(--bs-border-color); /* Setzt die Rahmenfarbe */
  border-radius: 5px;
}
</style>
