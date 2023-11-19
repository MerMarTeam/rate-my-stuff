const online = 'https://bootcamp-json-server-backend.adaptable.app'
const local = 'http://127.0.0.1:5005'


import axios from 'axios';

const api = axios.create({
    baseURL: local,
});

export default api;