// src/services/api.ts

import axios from 'axios';

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


export default {
    // User API Begins
    getUsers() {
        return apiClient.get('/users');
    },
    getUserById(id: number) {
        return apiClient.get(`/users/${id}`);
    },
    createUser(user: any) {
        return apiClient.post('/users', user);
    },
    deleteUser(id: number) {
        return apiClient.delete(`/users/${id}`);
    },
    updateUser(id: number, user: any) {
        return apiClient.put(`/users/${id}`, user);
    },
    validateUser(uuid: string) {
        return apiClient.post('/users/validate', {uuid});
    },
    // User API Ends

    // Expenditure API Begins
    getExpenditures() {
        return apiClient.get('/expenditures');
    },
    getExpenditureById(id: number) {
        return apiClient.get(`/expenditures/${id}`);
    },
    createExpenditure(expenditure: any) {
        return apiClient.post('/expenditures', expenditure);
    },
    deleteExpenditure(id: number) {
        return apiClient.delete(`/expenditures/${id}`);
    },
    updateExpenditure(id: number, expenditure: any) {
        return apiClient.put(`/expenditures/${id}`, expenditure);
    }
    // Expenditure API Ends
}
