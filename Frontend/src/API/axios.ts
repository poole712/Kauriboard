import axios from "axios";

const instance = axios.create({
    baseURL: 'https://kauriboard.onrender.com/api',
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


export default instance;