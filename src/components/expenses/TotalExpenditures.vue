<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import { type Expenditure } from '@/Expenditure';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';


const currencyapi = new Freecurrencyapi('fca_live_SXUfhiLcLAt87AE3F3ZZZ9i4yHzyQ4kfmKITa6Vy');
const emit = defineEmits(['ExchangeRate']);

const expendituresList = ref<Expenditure[]>([]);

const fetchExpenditures = async () => {
  try {
    const response = await api.getExpenditures();
    expendituresList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};



let exchangeRate = 0;
import { defineExpose } from 'vue';
defineExpose({ exchangeRate });
const baseCurrency = 'EUR'; //TODO Hier die Verbindung mit dem Profil bzw. der Standardwährung einfügen
const targetCurrency = 'USD'; //TODO Hier noch die Verbindung mit der Journey einfügen

// Aufruf der CurrencyAPI-Methode
currencyapi.latest({
  base_currency: baseCurrency,
  currencies: targetCurrency
}).then((response: any) => {
  // Überprüfe, ob response vorhanden und response.data vorhanden sind
  if (response && response.data && response.data.USD) {
    exchangeRate = response.data.USD;
    // Anzeige des Wechselkurses auf der Benutzeroberfläche
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');
    if (exchangeRateDisplay) {
      exchangeRateDisplay.innerText = `${exchangeRate}`;
    } else {
      console.error('Element with ID "exchangeRateDisplay" not found');
    }
  } else {
    console.error('Ungültige API-Antwort:', response);
  }
}).catch((error: any) => {
  console.error('Fehler beim Abrufen der Wechselkurse:', error);
});



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
          <h4>Current Exchange Rate</h4>
        </div>
        <div class="col text-end">
          <h4> <span id="exchangeRateDisplay"></span> </h4>
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
