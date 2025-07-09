import axios from 'axios';

const accountsClient = axios.create({
  baseURL: import.meta.env.VITE_ACC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default accountsClient;