<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import api from '@/services/api';
import type { Expenditure, Journey } from '@/types';
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import eventBus from '@/services/eventBus'; // Import EventBus

const expendituresList = ref<Expenditure[]>([]);
const currencyapi = new Freecurrencyapi('fca_live_SXUfhiLcLAt87AE3F3ZZZ9i4yHzyQ4kfmKITa6Vy');
const journeys = ref<Journey[]>([]);
const selectedJourneyId = ref<number | null>(Number(localStorage.getItem('selectedJourney')));
const uuid = localStorage.getItem('UUID') || 'default-uuid';
const homeCurrency = ref<string>('');
const vacCurrency = ref<string>('');
const budget = ref<number>(0);
const exchangeRate = ref<number | null>(null);

const fetchExpenditures = async (journeyId: number) => {
  try {
    const response = await api.getAllExpenditures(journeyId);
    expendituresList.value = response.data;
  } catch (error) {
    console.error('Error fetching expenditures:', error);
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
      </div>
      <hr>
      <div class="row">
        <div class="col text-start">
          <h4>Home Currency</h4>
        </div>
        <div class="col text-end">
          <h4>{{ homeCurrency }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h4>Vacation Currency</h4>
        </div>
        <div class="col text-end">
          <h4>{{ vacCurrency }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col text-start">
          <h4>Budget</h4>
        </div>
        <div class="col text-end">
          <h4>€ {{ budget }}</h4>
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
          <h4>€ {{ budget - totalExpenditures }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
