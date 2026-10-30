import axios from 'axios';
import store from '../store/store.js';



const axiosInstance = axios.create({
    // baseURL: "http://localhost:4545/api",
    baseURL: "https://taskflow-backend-zqfq.onrender.com/api",
    withCredentials: true,
});


axiosInstance.interceptors.request.use(config => {

    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    };

    return config
}, (error) => Promise.reject(error))

export default axiosInstance;



