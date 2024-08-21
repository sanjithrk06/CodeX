import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://10.70.2.34:4444/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
