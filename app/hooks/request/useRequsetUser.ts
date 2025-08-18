import { userLoginType, userRegisterType } from "@/api/types";
import { fetchLogin, fetchRegister } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

export const useLoginQuery = (data: userLoginType) => {
  return useMutation({
    mutationKey: ["loginData", data], // 缓存 key
    mutationFn: () => fetchLogin(data),
    retry: 0, // 失败不重试
  });
};

export const useRegisterQuery = () => {
  return useMutation({
    mutationKey: ["registerData"], // 缓存 key
    mutationFn: (data:userRegisterType) => fetchRegister(data),
    retry: 0, // 失败不重试
  });
};
