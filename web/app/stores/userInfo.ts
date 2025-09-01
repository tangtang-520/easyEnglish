import type { User } from "~/types/auth";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore(
  "userInfo",
  () => {
    const userInfo = ref<User | null>(null);
    const authToken = ref<string>("");

    const hasToken = computed(() => authToken.value !== "");

    function setUserInfo(data: User) {
      userInfo.value = data;
    }

    function setToken(data: string) {
      authToken.value = data;
    }

    function clearUserInfo() {
      userInfo.value = null;
      authToken.value = "";
    }

    return {
      userInfo,
      authToken,
      hasToken,
      setUserInfo,
      setToken,
      clearUserInfo,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
