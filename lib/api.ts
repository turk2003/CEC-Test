import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6916ccd6a7a34288a27e6818.mockapi.io/api/cpm',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access');
    }
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;