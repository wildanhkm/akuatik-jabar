import axios from 'axios';

// Create axios instance with base configuration
const makeApiCall = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // Prevent transformRequest when sending FormData
  transformRequest: [
    function (data) {
      // If it's FormData, return it directly without transformation
      if (data instanceof FormData) {
        return data;
      }
      // Otherwise, apply default transformation (convert to JSON)
      if (data) {
        return JSON.stringify(data);
      }
      return data;
    },
  ],
});

// Request interceptor to add the token from localStorage before each request
makeApiCall.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't modify Content-Type when FormData is being sent
    // Axios will automatically set the correct Content-Type with boundary for FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
makeApiCall.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (expired token)
    if (error.response && error.response.status === 401) {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default makeApiCall;
