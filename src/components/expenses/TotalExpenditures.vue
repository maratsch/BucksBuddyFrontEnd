<!--src/components/expenses/TotalExpenditures.vue-->

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import api from '@/services/api';
import {type Expenditure} from '@/types';
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

const expendituresList = ref<Expenditure[]>([]);
const currencyapi = new Freecurrencyapi('fca_live_SXUfhiLcLAt87AE3F3ZZZ9i4yHzyQ4kfmKITa6Vy');

const fetchExpenditures = async () => {
  try {
    const response = await api.getExpenditures();
    expendituresList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

let exchangeRate: number | null = null; // Initialisiere exchangeRate außerhalb der Methode
// Aufruf der CurrencyAPI-Methode
currencyapi.latest({
  base_currency: "EUR",
  currencies: "USD"
}).then((response: any) => {
  // Überprüfe, ob response vorhanden und response.data vorhanden sind
  if (response && response.data && response.data.USD) {
    exchangeRate = response.data.USD;

    // Anzeige des Wechselkurses auf der Benutzeroberfläche
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');
    if (exchangeRateDisplay && exchangeRate!==null) {
      exchangeRateDisplay.innerText = exchangeRate.toString();
    } else {
      console.error('Element with ID "exchangeRateDisplay" not found');
    }
  } else {
    console.error('Ungültige API-Antwort:', response);
  }
}).catch((error: any) => {
  console.error('Fehler beim Abrufen der Wechselkurse:', error);
});
console.log('Aktueller Wechselkurs:', exchangeRate);


const totalExpenditures = computed(() => {
  return expendituresList.value.reduce((sum, expenditure) => sum + expenditure.amount, 0);
});

onMounted(() => {
  fetchExpenditures();
});
</script>

<template>
  <div class="card shadow mb-3">
    <div class="card-body">
      <div class="row">
        <div class="col text-start">
          <h3>Journey</h3>
        </div>
        <div class="col text-end">
          <select class="form-select">
            <option disabled value="">Please select one</option>
            <option value="thailand">Thailand</option>
            <option value="japan">Japan</option>
            <option value="france">France</option>
            <option value="brazil">Brazil</option>
          </select>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col text-start">
          <h4>Home Currency</h4>
        </div>
        <div class="col text-end">
          <h4>EUR</h4>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Vacation Currency</h4>
        </div>
        <div class="col text-end">
          <h4>USD</h4>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Budget</h4>
        </div>
        <div class="col text-end">
          <h4>€ 600</h4>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Exchange Rate</h4>
        </div>
        <div class="col text-end">
          <h4> {{exchangeRate}} </h4>
        </div>
      </div>

      <hr>
      <div class="row">
        <div class="col text-start">
          <h3>Total Expenses</h3>
        </div>
        <div class="col text-end">
          <h3>€ {{ totalExpenditures }}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col text-start">
          <h4>Budget Left</h4>
        </div>
        <div class="col text-end">
          <h4>€ {{ 600 - totalExpenditures }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
