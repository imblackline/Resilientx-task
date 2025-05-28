import axios from 'axios';

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

if (githubToken) {
  headers['Authorization'] = `Bearer ${githubToken}`;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.github.com',
  headers,
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
          console.error('Unauthorized: Please check your credentials or token.');
          error.message = 'Unauthorized: Please check your credentials or token.';
          break;
        case 403:
          if (
            error.response.data.message &&
            error.response.data.message.includes('rate limit')
          ) {
            console.error('GitHub API rate limit exceeded. Please add a GitHub token to increase the limit.');
            error.message = 'GitHub API rate limit exceeded. Please add a GitHub token to increase the limit.';
          } else {
            console.error('Forbidden: You do not have permission to access this resource.');
            error.message = 'Forbidden: You do not have permission to access this resource.';
          }
          break;
        case 404:
          console.error('Not Found: The requested resource could not be found.');
          error.message = 'Not Found: The requested resource could not be found.';
          break;
        case 500:
          console.error('Internal Server Error: Please try again later.');
          error.message = 'Internal Server Error: Please try again later.';
          break;
        default:
          console.error(`Error: ${error.response.statusText}`);
          error.message = `Error: ${error.response.statusText}`;
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;