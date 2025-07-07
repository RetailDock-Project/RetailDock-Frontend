import axios from "axios";

const inventoryClient = axios.create({
  baseURL: import.meta.env.VITE_INVENTORY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default inventoryClient;
