import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
    }
    return Promise.reject(error);
  }
);
