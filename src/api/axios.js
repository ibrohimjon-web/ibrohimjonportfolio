import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5434',
});

export default api;
