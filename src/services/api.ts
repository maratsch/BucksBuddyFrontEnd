// src/services/api.ts

import axios from 'axios';
import type {Expenditure, Journey, newUser} from '@/types';

const apiClient = axios.create({
    baseURL: //'https://bucksbuddybackend.onrender.com/',
    'http://localhost:8080/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.get(`/`)
    .then(response => {
        //console.log(response.data);
    })
    .catch(error => {
        if (error.response) {
            console.error('Backend responded with an error:', error.response.data);
        } else if (error.request) {
            console.error('Unable to connect to the backend:', error.request);
        } else {
            console.error('An error occurred:', error.message);
        }
    });

apiClient.interceptors.request.use((config) => {
    let userUuid = localStorage.getItem('UUID');
    //console.log('UUID from local storage:', userUuid);
    if (userUuid) {
        // Entferne das Präfix 'UUID:'
        if (userUuid.startsWith('UUID: ')) {
            userUuid = userUuid.replace('UUID: ', '');
        }
        config.headers['uuid'] = userUuid;
    }
    //console.log('Request headers:', config.headers);
    return config;
});


export default {
    // User API
    login(email: string, password: string) {
        return apiClient.post('/users/login', {email, password});
    },
    createUser(newUser: newUser) {
        return apiClient.post('/users', newUser);
    },
    deleteUser(uuid: string) {
        return apiClient.delete('/users');
    },
    changePassword(uuid: string, payload: { newPassword: string }) {
        return apiClient.patch('/users/password', payload, {
            headers: { uuid }
        });
    },
    // Journey API
    getAllJourneys(uuid: string) {
        return apiClient.get('/users/journeys');
    },
    getJourneyById(id: number) {
        return apiClient.get(`/users/journeys/${id}`);
    },
    createJourney(uuid: string, journey: Omit<Journey, "id">) {
        return apiClient.post('/users/journeys', journey);
    },
    deleteJourney(id: number) {
        return apiClient.delete(`/users/journeys/${id}`);
    },
    updateJourneyName(id: number, name: string) {
        return apiClient.patch(`/users/journeys/${id}`, {name});
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

