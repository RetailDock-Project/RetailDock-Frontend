import axios from "axios";

const developerClient = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default developerClient;
