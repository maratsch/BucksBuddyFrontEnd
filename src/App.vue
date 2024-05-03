<script setup lang="ts">
import { ref, provide } from 'vue';
import NavBar from "@/components/NavBar.vue";
import InputForm from "@/components/InputForm.vue";
import History from "@/components/History.vue";
import TotalExpense from "@/components/TotalExpense.vue";

// Erstellen einer reaktiven Referenz für die Ausgabenliste
const expensesList = ref([]);

// Die Liste bereitstellen
provide('expensesList', expensesList);

// Methode zum Hinzufügen eines neuen Ausgabenobjekts
const addExpense = (newExpense) => {
  expensesList.value.push(newExpense);
}
</script>

<template>
  <nav-bar/>
  <div class="container">
    <div class="row">
      <div class="col col-md-6">
        <total-expense />
        <!-- Event Listener für das "on-new-expense" Event -->
        <input-form @new-expense="addExpense" />
      </div>
      <div class="col col-md-6">
        <history />
      </div>
    </div>
  </div>
</template>


