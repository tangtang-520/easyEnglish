import { requert } from "~/utils/axios";
import type { SearchWordRequest } from "~/api/types";

// 单词查询
export const searchWordApi = (params: SearchWordRequest) => {
  return requert().get("/search/word", { params });
};

// 随机单词
export const randomWordApi = () => {
  return requert().get("/search/random");
};