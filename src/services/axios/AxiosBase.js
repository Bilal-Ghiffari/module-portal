import axios from 'axios';
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback';
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback';

// Create an Axios instance
const AxiosBase = axios.create({
  timeout: 60000,
  // baseURL: `${'http://192.168.1.93:3000' || 'http://localhost:5173'}`, // ahu layanan port nya 3000 local
  baseURL: `${import.meta.env.VITE_APP_BASEURL_FE || 'http://localhost:5173'}`,
});

// Request interceptor
AxiosBase.interceptors.request.use(
  (config) => {
    return AxiosRequestIntrceptorConfigCallback(config); // Modify request config as needed
  },
  (error) => {
    console.error('Request error:', error); // Optionally log the request error
    return Promise.reject(error); // Reject the promise with the error
  }
);

// Response interceptor
AxiosBase.interceptors.response.use(
  (response) => {
    return response; // Directly return the response if successful
  },
  (error) => {
    // Handle response errors with your custom error callback
    AxiosResponseIntrceptorErrorCallback(error);
    console.error('Response error:', error); // Log the response error for debugging
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default AxiosBase;
