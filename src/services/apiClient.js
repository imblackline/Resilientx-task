import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 403:
          if (error.response.data.message.includes('rate limit')) {
            console.error('GitHub API rate limit exceeded. Please add a GitHub token to increase the limit.');
          }
          break;
        case 404:
          break;
        case 500:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient; 