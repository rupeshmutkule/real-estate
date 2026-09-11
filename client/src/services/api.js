import axios from "axios";

// Remove trailing slash to avoid double slashes
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
