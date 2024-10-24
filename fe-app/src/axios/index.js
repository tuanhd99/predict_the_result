import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1999',
    timeout: 30000,
});

export default instance;
