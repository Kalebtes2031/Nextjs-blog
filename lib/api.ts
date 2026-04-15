import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// attach token safely (client-side only)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});