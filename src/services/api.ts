import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Die URL Ihres Backends
    withCredentials: true, // Dies ermöglicht das Senden von Cookies mit Anfragen
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
