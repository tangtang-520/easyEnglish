// ~/utils/axios.ts
import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const requert: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
});

// 请求拦截器
requert.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
requert.interceptors.response.use(
  (response) => response.data, // 直接返回 data
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default requert;
