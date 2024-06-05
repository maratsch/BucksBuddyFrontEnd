// src/services/api.ts

import axios from 'axios';
import type {Expenditure} from "@/Expenditure";

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

const getUserId = (): number => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        throw new Error('User ID not found in localStorage');
    }
    return parseInt(userId, 10);
};


export default {
    // User API Begins
    login(email: string, password: string) {
        return apiClient.post('/users/login', {email, password});
    },
    getUserIdByEmail(email: string) {
        return apiClient.get(`/users/id/${email}`);
    },
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
    // User API Ends

    // Expenditure API Begins
    getExpenditures() {
        const userId = getUserId();
        return apiClient.get(`/users/${userId}/expenditures`);
    },
    getExpenditureById(id: number) {
        const userId = getUserId();
        return apiClient.get(`/users/${userId}/expenditures/${id}`);
    },
    createExpenditure(expenditure: Omit<Expenditure, 'id'>) {
        const userId = getUserId();
        return apiClient.post(`/users/${userId}/expenditures`, expenditure);
    },
    deleteExpenditure(id: number) {
        const userId = getUserId();
        return apiClient.delete(`/users/${userId}/expenditures/${id}`);
    },
    updateExpenditure(id: number, expenditure: Omit<Expenditure, 'id'>) {
        const userId = getUserId();
        return apiClient.put(`/users/${userId}/expenditures/${id}`, expenditure);
    }
    // Expenditure API Ends
}
