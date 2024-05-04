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
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

