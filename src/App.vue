<script setup lang="ts">
import { ref, provide } from 'vue';
import NavBar from "@/components/NavBar.vue";
import InputForm from "@/components/InputForm.vue";
import History from "@/components/History.vue";
import TotalExpense from "@/components/TotalExpense.vue";

// Creating a reactive reference for the expenses list
const expensesList = ref([]);

// Providing the list for descendant components
provide('expensesList', expensesList);

// Method to add a new expense object
const addExpense = (newExpense) => {
  expensesList.value.push(newExpense);
}
</script>

<template>
  <nav-bar />
  <div class="container">
    <div class="row">
      <div class="col col-md-6">
        <total-expense />
        <input-form @new-expense="addExpense" />
      </div>
      <div class="col col-md-6">
        <history />
      </div>
    </div>
  </div>
</template>



