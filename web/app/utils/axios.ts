// ~/utils/axios.ts
import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { toast } from "vue-sonner";


export function requert(): AxiosInstance {
  const config = useRuntimeConfig();

  const requert: AxiosInstance = axios.create({
    baseURL: config.public.apiBase || "http://localhost:3000/api",
    timeout: 10000,
  });

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

  requert.interceptors.response.use(
    (response) => {
      console.log(response.data);
      const { code, message, data } = response.data;
      
      if(code !== 0 ) {
        console.log(message);
        toast.error(message || '请求失败');
        return Promise.reject(message);
      }
      return response.data
      
    },
    (error) => {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data || error.message);
      return Promise.reject(error);

    }
  );

  return requert;
}