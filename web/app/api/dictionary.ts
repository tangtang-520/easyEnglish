import type { SearchWordRequest } from "~/api/types";



// 单词查询
export const searchWordApi = async (params: SearchWordRequest) => {
  const { $axios } = useNuxtApp();
  return await $axios.get("/search/word", { params });
};

// 随机单词
export const randomWordApi = async () => {
  const { $axios } = useNuxtApp();
  return await $axios.get("/search/random");
};
