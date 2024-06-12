<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import api from '@/services/api';
import type { Expenditure, Journey } from '@/types';
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import eventBus from '@/services/eventBus'; // Import EventBus

const expendituresList = ref<Expenditure[]>([]);
const currencyapi = new Freecurrencyapi(import.meta.env.VITE_API_KEY);
const journeys = ref<Journey[]>([]);
const selectedJourneyId = ref<number | null>(Number(localStorage.getItem('selectedJourney')));
const uuid = localStorage.getItem('UUID') || 'default-uuid';
const homeCurrency = ref<string>('');
const vacCurrency = ref<string>('');
const budget = ref<number>(0);
const exchangeRate = ref<number | null>(null);

const currencyNames: Record<string, string> = {
  EUR: 'Euro',
  USD: 'US Dollar',
  JPY: 'Japanese Yen',
  BGN: 'Bulgarian Lev',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HUF: 'Hungarian Forint',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  SEK: 'Swedish Krona',
  CHF: 'Swiss Franc',
  ISK: 'Icelandic Króna',
  NOK: 'Norwegian Krone',
  HRK: 'Croatian Kuna',
  RUB: 'Russian Ruble',
  TRY: 'Turkish Lira',
  AUD: 'Australian Dollar',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CNY: 'Chinese Yuan',
  HKD: 'Hong Kong Dollar',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  ZAR: 'South African Rand',
};

const fetchExpenditures = async (journeyId: number) => {
  try {
    const response = await api.getAllExpenditures(journeyId);
    expendituresList.value = response.data;
  } catch (error) {
    console.error('Error fetching expenditures:', error);
  }
};

const deleteJourney = async (journeyId: number) => {
  try {
    await api.deleteJourney(journeyId);
    console.log('Journey deleted successfully');
    await fetchJourneys();
    selectedJourneyId.value = null;
    localStorage.removeItem('selectedJourney');
    eventBus.emit('journeyIdChanged', null); // Emit event for clearing expenditures
  } catch (error) {
    console.error('Error deleting journey:', error);
  }
};

watch(selectedJourneyId, async (newVal) => {
  console.log('Selected Journey ID changed to:', newVal);
  if (newVal !== null) {
    localStorage.setItem('selectedJourney', newVal.toString());
    await fetchJourneyDetails(newVal);
    await fetchExpenditures(newVal);
    eventBus.emit('journeyIdChanged', newVal); // Emit event
  } else {
    localStorage.removeItem('selectedJourney');
    eventBus.emit('journeyIdChanged', null); // Emit event for clearing expenditures
  }
});

const fetchJourneyDetails = async (journeyId: number) => {
  try {
    const journeyResponse = await api.getJourneyById(journeyId);
    const journey = journeyResponse.data;
    homeCurrency.value = await api.getHomeCurrency(journeyId).then(response => response.data);
    vacCurrency.value = await api.getVacCurrency(journeyId).then(response => response.data);
    budget.value = await api.getBudget(journeyId).then(response => response.data);
    exchangeRate.value = await currencyapi.latest({
      base_currency: homeCurrency.value,
      currencies: vacCurrency.value
    }).then((response: any) => response.data[vacCurrency.value]);
    eventBus.emit('exchangeRateUpdated', exchangeRate.value); // Emit exchange rate
    eventBus.emit('vacCurrencyUpdated', vacCurrency.value); // Emit vacation currency
    eventBus.emit('homeCurrencyUpdated', homeCurrency.value); // Emit home currency
  } catch (error) {
    console.error('Error fetching journey details:', error);
  }
};

const fetchJourneys = async () => {
  try {
    if (!uuid) {
      console.error('UUID is missing');
      return;
    }
    console.log('Fetching journeys for UUID:', uuid);
    const response = await api.getAllJourneys(uuid);
    if (response.data && Array.isArray(response.data)) {
      journeys.value = response.data;
      console.log("Journeys set to:", journeys.value);
    } else {
      console.error('Unexpected API response:', response);
    }
  } catch (error) {
    console.error('Error fetching journeys:', error);
  }
};

const totalExpenditures = computed(() => {
  return expendituresList.value.reduce((sum, expenditure) => sum + expenditure.amount, 0);
});

const getCurrencyName = (code: string) => {
  return currencyNames[code] || code;
};

const formatExchangeRate = (rate: number | null) => {
  return rate !== null ? rate.toFixed(2) : 'N/A';
};

const totalExpensesInVacCurrency = computed(() => {
  return exchangeRate.value !== null ? (totalExpenditures.value * exchangeRate.value).toFixed(2) : 'N/A';
});

onMounted(async () => {
  await fetchJourneys();
  const storedJourneyId = Number(localStorage.getItem('selectedJourney'));
  if (storedJourneyId && journeys.value.some(j => j.id === storedJourneyId)) {
    selectedJourneyId.value = storedJourneyId;
    await fetchJourneyDetails(storedJourneyId);
    await fetchExpenditures(storedJourneyId);
  } else {
    localStorage.removeItem('selectedJourney');
    selectedJourneyId.value = null;
    eventBus.emit('journeyIdChanged', null); // Emit event for clearing expenditures
  }
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
          <select class="form-select" v-model="selectedJourneyId">
            <option disabled value="">Please select one</option>
            <option v-for="journey in journeys" :key="journey.id" :value="journey.id">{{ journey.name }}</option>
          </select>
        </div>
        <div class="col text-end">
          <button class="btn btn-danger" @click="deleteJourney(selectedJourneyId)">Delete Journey</button>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col text-start">
          <h4>Home Currency</h4>
        </div>
        <div class="col text-end">
          <h4>{{ getCurrencyName(homeCurrency) }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h4>Vacation Currency</h4>
        </div>
        <div class="col text-end">
          <h4>{{ getCurrencyName(vacCurrency) }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h4>Budget</h4>
        </div>
        <div class="col text-end">
          <h4>{{ budget }} {{homeCurrency}}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h4>Exchange Rate</h4>
        </div>
        <div class="col text-end">
          <h4>{{ exchangeRate }}</h4>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col text-start">
          <h3>Total Expenses in {{ getCurrencyName(homeCurrency) }}</h3>
        </div>
        <div class="col text-end">
          <h3>{{ totalExpenditures }} {{homeCurrency}}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h3>Total Expenses in {{ getCurrencyName(vacCurrency) }}</h3>
        </div>
        <div class="col text-end">
          <h3>{{ totalExpensesInVacCurrency }} {{vacCurrency}}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h4>Budget Left in {{getCurrencyName(homeCurrency)}}</h4>
        </div>
        <div class="col text-end">
          <h4>{{ budget - totalExpenditures }} {{homeCurrency}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
