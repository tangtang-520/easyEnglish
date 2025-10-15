import type { LoginRequest, RegisterRequest } from "~/api/types";

// 登录api
export const loginUserApi = async (data: LoginRequest) => {
  const { $axios } = useNuxtApp();
  return await $axios.post("/user/login", data);
};

// 注册api
export const registerUserApi = async (data: RegisterRequest) => {
  const { $axios } = useNuxtApp();
  return await $axios.post("/user/register", data);
};
