import { toastFromAnywhere } from '@/context/ToastContext';
import axios from "axios";

const requert = axios.create({
  baseURL: "http://192.168.11.135:3000/api", // 可以改成你的词典/翻译 API
  timeout: 6000,
});

// 请求拦截器
requert.interceptors.request.use(
  (config) => {
    console.log("Request:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
requert.interceptors.response.use(
  (response) => {
    console.log("Response:", response.data);

    const { coed, data, message } = response.data;
    if (coed !== 0) {
      toastFromAnywhere( message || '请求失败'); 
      return Promise.reject(new Error(message || "请求失败"));
    }

    return data;
  },
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default requert;
