import { requert } from "~/utils/axios";
import type { LoginRequest, RegisterRequest } from "~/api/types";

// 登录api
export const loginUserApi = (data: LoginRequest) => {
  return requert().post("/user/login", data);
};

// 注册api
export const registerUserApi = (data: RegisterRequest) => {
  return requert().post("/user/register", data);
};

