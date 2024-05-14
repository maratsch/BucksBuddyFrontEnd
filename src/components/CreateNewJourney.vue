<script setup lang="ts">
import {ref} from 'vue';

const name = ref('');
const homeCurrency = ref('');
const vacationCurrency = ref('');
const budget = ref('');
const startDate = ref('');
const endDate = ref('');
const travelDuration = ref('');
const dateError = ref('');


const calculateDuration = () => {
  if (startDate.value && endDate.value) {
    if (startDate.value < endDate.value) {
      const start = new Date(startDate.value);
      const end = new Date(endDate.value);
      const difference = end.getTime() - start.getTime();
      const days = Math.ceil(difference / (1000 * 3600 * 24));
      travelDuration.value = `${days} day(s)`;
      dateError.value = '';
    } else {
      travelDuration.value = '';
      dateError.value = 'Startdatum muss vor dem Enddatum liegen.';
    }
  } else {
    travelDuration.value = '';
    dateError.value = '';
  }
};
</script>

<template>
  <div class="card shadow m-3">
    <div class="card-body">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <h2 class="text-center mb-4">Create New Journey</h2>
          <form @submit.prevent="calculateDuration">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="name" required>
            </div>
            <div class="mb-3">
              <label for="homeCurrency" class="form-label">Home Currency</label>
              <div class="col text-end">
                <select class="form-select">
                  <option disabled value="">Please select one</option>
                  <option value="euro">EUR</option>
                  <option value="yen">YEN</option>
                  <option value="us dollar">USD</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label for="vacationCurrency" class="form-label">Vacation Currency</label>
              <div class="col text-end">
                <select class="form-select">
                  <option disabled value="">Please select one</option>
                  <option value="euro">EUR</option>
                  <option value="yen">YEN</option>
                  <option value="us dollar">USD</option>
                  <option value="baht">BHT</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label for="budget" class="form-label">Budget (optional)</label>
              <input type="number" class="form-control" id="budget" v-model="budget">
            </div>
            <hr>

            <div class="mb-3">
              <label for="startDate" class="form-label">Start Date</label>
              <input type="date" class="form-control" id="startDate" v-model="startDate" @change="calculateDuration"
                     required>
            </div>
            <div class="mb-3">
              <label for="endDate" class="form-label">End Date</label>
              <input type="date" class="form-control" id="endDate" v-model="endDate" @change="calculateDuration"
                     required>
              <div v-if="dateError" class="text-danger">{{ dateError }}</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Travel Duration</label>
              <input type="text" class="form-control" :value="travelDuration" disabled>
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
