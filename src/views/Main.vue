<script setup lang="ts">
import { ref, provide, reactive, onMounted } from 'vue';
import TotalExpense from "@/components/expenses/TotalExpense.vue";
import History from "@/components/expenses/History.vue";
import InputForm from "@/components/expenses/InputForm.vue";
import type { Expenditure } from '@/Expenditure';
import apiClient from "@/services/api";

// Creating a reactive reference for the expenses list
const expensesList = ref<Expenditure[]>([]);

// Providing the list for descendant components
provide('expensesList', expensesList);

// Fetch initial expenditures
const fetchExpenditures = async () => {
  try {
    const response = await apiClient.get<Expenditure[]>('/expenditures');
    expensesList.value = response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};

onMounted(() => {
  fetchExpenditures();
});

/*
Method to add a new expense object of the Interface Expense to expensesList
 */
const addExpense = (newExpense: Expenditure) => {
  expensesList.value.push(newExpense);
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col col-md-6">
        <total-expense />
        <input-form @expense-added="addExpense" />
      </div>
      <div class="col col-md-6">
        <history :expenditures="expensesList" />
      </div>
    </div>
  </div>
</template>
