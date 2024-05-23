// src/api.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: '3.125.183.140/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    getExpenditures() {
        return apiClient.get('/expenditures');
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
