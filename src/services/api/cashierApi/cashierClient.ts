import axios from 'axios';

const cashierClient = axios.create({
  baseURL: import.meta.env.VITE_BILLING_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default cashierClient;
