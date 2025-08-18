import requert from "@/server/axios";
import { userLoginType, userRegisterType } from "./types";

// 登录
export const fetchLogin = async (data: userLoginType) => {
  const res = await requert.post(`/user/login`, { data: data });
  return res;
};

// 注册
export const fetchRegister = async (data: userRegisterType) => {
  const res = await requert.post(`/user/register`, data);
  return res;
};
