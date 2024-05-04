<script setup lang="ts">
import { ref, provide } from 'vue';
import TotalExpense from "@/components/TotalExpense.vue";
import History from "@/components/History.vue";
import NavBar from "@/components/NavBar.vue";
import InputForm, {type Expense} from "@/components/InputForm.vue";
// Creating a reactive reference for the expenses list
const expensesList = ref<Expense[]>([]);
// Providing the list for descendant components
provide('expensesList', expensesList);


/*
Method to add a new expense object of the Interface Expense to expensesList
 */
const addExpense = (newExpense : Expense) => {
  expensesList.value.push(newExpense);
}
</script>


<template>
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