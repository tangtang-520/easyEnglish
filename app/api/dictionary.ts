import requert from "@/server/axios";

export const fetchWordData = async (word: string) => {
  const res = await requert.get(`/${word}`);
  return res.data;
};
