// src/services/api.ts

import axios from 'axios';
import type { Expenditure, Journey, User } from '@/types';

const apiClient = axios.create({
    // For local development
    baseURL: 'http://localhost:8080/',
    // For Render
    // baseURL: 'https://bucksbuddybackend.onrender.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.get(`/`)
    .then(response => {
        // Erfolgreiche Antwort vom Backend erhalten
        console.log(response.data);
    })
    .catch(error => {
        if (error.response) {
            // Antwort vom Backend erhalten, aber mit einem Fehlerstatuscode
            console.error('Backend responded with an error:', error.response.data);
        } else if (error.request) {
            // Keine Antwort vom Backend erhalten
            console.error('Unable to connect to the backend:', error.request);
        } else {
            // Ein anderer Fehler ist aufgetreten
            console.error('An error occurred:', error.message);
        }
    });

apiClient.interceptors.request.use((config) => {
    let userUuid = localStorage.getItem('UUID');
    console.log('UUID from local storage:', userUuid);
    if (userUuid) {
        // Entferne das Präfix 'UUID:'
        if (userUuid.startsWith('UUID: ')) {
            userUuid = userUuid.replace('UUID: ', '');
        }
        config.headers['uuid'] = userUuid;
    }
    console.log('Request headers:', config.headers);
    return config;
});


export default {
    // User API
    login(email: string, password: string) {
        return apiClient.post('/users/login', { email, password });
    },
    createUser(user: User) {
        return apiClient.post('/users', user);
    },

    // Journey API
    getAllJourneys(uuid: string) {
        return apiClient.get('/users/journeys');
    },
    getJourneyById(id: number) {
        return apiClient.get(`/users/journeys/${id}`);
    },
    createJourney(uuid: string ,journey: Omit<Journey, "id">) {
        return apiClient.post('/users/journeys', journey);
    },
    deleteJourney(id: number) {
        return apiClient.delete(`/users/journeys/${id}`);
    },
    updateJourneyName(id: number, name: string) {
        return apiClient.patch(`/users/journeys/${id}`, { name });
    },
    getHomeCurrency(journeyId: number) {
        return apiClient.get(`/users/journeys/${journeyId}/homeCurrency`);
    },
    getVacCurrency(journeyId: number) {
        return apiClient.get(`/users/journeys/${journeyId}/vacCurrency`);
    },
    getBudget(journeyId: number) {
        return apiClient.get(`/users/journeys/${journeyId}/budget`);
    },
    getStartDate(journeyId: number) {
        return apiClient.get(`/users/journeys/${journeyId}/startDate`);
    },
    getEndDate(journeyId: number) {
        return apiClient.get(`/users/journeys/${journeyId}/endDate`);
    },


    // Expenditure API
    getAllExpenditures(journeyId: number) {
        return apiClient.get(`/users/journeys/${journeyId}/expenditures`);
    },
    getExpenditureById(journeyId: number, id: number) {
        return apiClient.get(`/users/journeys/${journeyId}/expenditures/${id}`);
    },
    createExpenditure(journeyId: number, expenditure: Omit<Expenditure, 'id'>) { // Update the type here
        return apiClient.post(`/users/journeys/${journeyId}/expenditures`, expenditure);
    },
    deleteExpenditure(journeyId: number, id: number) {
        return apiClient.delete(`/users/journeys/${journeyId}/expenditures/${id}`);
    },
    updateExpenditure(journeyId: number, id: number, expenditure: Expenditure) {
        return apiClient.put(`/users/journeys/${journeyId}/expenditures/${id}`, expenditure);
    },


};

