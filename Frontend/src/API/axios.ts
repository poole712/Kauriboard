import axios from "axios";

const instance = axios.create({
    baseURL: 'https://kauriboard-c4fvc3dkhfg7d6ey.canadacentral-01.azurewebsites.net/api',
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