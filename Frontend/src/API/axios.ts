import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5017/api',
    timeout: 5000,
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