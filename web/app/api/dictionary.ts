import { requert } from "~/utils/axios";
import type { SearchWordRequest } from "~/api/types";

// 单词查询
export const searchWordApi = (params: SearchWordRequest) => {
  return requert().get("/search/word", { params });
};
