import { requert } from "~/utils/axios";
import type { LoginRequest } from "~/api/types";

// 登录api
export const loginUserApi = (data: LoginRequest) => {
  return requert().post("/user/login", data);
};
