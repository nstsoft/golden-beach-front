import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.passphrase = localStorage.getItem('passphrase');
  return config;
});
axiosInstance.interceptors.response.use();

export const http = axiosInstance;
