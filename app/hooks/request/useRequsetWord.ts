import { fetchWordData } from "@/api/dictionary";
import { useQuery } from "@tanstack/react-query";

export const useWordQuery = (word: string) => {
  return useQuery({
    queryKey: ["word", word], // 缓存 key
    queryFn: () => fetchWordData(word),
    enabled: !!word, // 当有单词时才请求
    staleTime: 1000 * 60 * 60, // 缓存 1 小时
    retry: 0, // 失败不重试
  });
};