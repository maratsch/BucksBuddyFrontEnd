// src/api.ts
import axios from 'axios';

const apiClient = axios.create({
    // For local development
    baseURL: 'http://localhost:8080/api',
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
    getExpenditures() {
        return apiClient.get('/expenditures');
    },
    getExpenditureById(id: number) {
        return apiClient.get(`/expenditure?id=${id}`);
    },
    createExpenditure(expenditure: any) {
        return apiClient.post('/expenditure', expenditure);
    },
    deleteExpenditure(id: number) {
        return apiClient.delete(`/expenditure?id=${id}`);
    },
    updateExpenditure(expenditure: any) {
        return apiClient.put('/expenditure', expenditure);
    }
}
