import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://api-cec-dev.pea.co.th',
  // baseURL: 'https://6916ccd6a7a34288a27e6818.mockapi.io/api/cpm/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - เพิ่ม token อัตโนมัติ
api.interceptors.request.use(
  (config) => {
    // ดึง token จาก cookies
    const token = Cookies.get('token') || Cookies.get('access_token');
    
    // เพิ่ม Authorization header ถ้ามี token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    console.log('Headers:', config.headers);
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - token might be invalid');
      
      // ลบ token ที่หมดอายุและ redirect ไป login
      Cookies.remove('token');
      Cookies.remove('access_token');
      
      // Redirect ไปหน้า login (ถ้าไม่อยู่หน้า login อยู่แล้ว)
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
        window.location.href = '/';
      }
    }
    
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;