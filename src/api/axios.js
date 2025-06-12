import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portfolobk.onrender.com',
});

export default api;
