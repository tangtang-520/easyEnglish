import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { toast } from "vue-sonner";
import { useLoginDialog } from "~/composables/useLoginDialog";

const pendingRequests = new Map<string, AbortController>();
const requestTimestamps = new Map<string, number>();
const REQUEST_INTERVAL = 1000;

function getRequestKey(config: InternalAxiosRequestConfig): string {
  return `${config.method}-${config.url}-${JSON.stringify(
    config.params || config.data || {}
  )}`;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance: AxiosInstance = axios.create({
    baseURL: config.public.apiBase || "http://localhost:3000/api",
    timeout: 10000,
  });

  instance.interceptors.request.use((config) => {
    let token = "";
    // 只在客户端访问localStorage
    if (process.client) {
      const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
      token = userData?.authToken || "";
    }
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const requestKey = getRequestKey(config);
    const now = Date.now();
    const lastTime = requestTimestamps.get(requestKey) || 0;

    // 检查是否在时间间隔内
    if (now - lastTime < REQUEST_INTERVAL) {
      toast.error("请勿重复请求");
      throw new Error("重复请求被阻止");
    }

    // 取消之前的相同请求
    const existingController = pendingRequests.get(requestKey);
    if (existingController) {
      existingController.abort();
    }

    // 创建新的 AbortController
    const controller = new AbortController();
    config.signal = controller.signal;

    pendingRequests.set(requestKey, controller);
    requestTimestamps.set(requestKey, now);

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      const requestKey = getRequestKey(response.config);
      pendingRequests.delete(requestKey);

      const { code, message } = response.data;
      if (code !== 0) {
        toast.error(message || "请求失败");
        return Promise.reject(new Error(message || "请求失败"));
      }

      return response.data;
    },
    (error) => {
      if (error.config) {
        const requestKey = getRequestKey(error.config);
        pendingRequests.delete(requestKey);
      }

      // 如果是用户取消的请求，不显示错误
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        // 登录过期，打开提示登录弹窗
        useLoginDialog().open();
        return Promise.reject(error);
      }

      toast.error(error.message || "请求失败");
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: instance,
    },
  };
});
