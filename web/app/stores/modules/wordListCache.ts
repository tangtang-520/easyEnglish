import type { wordList } from "~/types/auth";
import { defineStore } from "pinia";

export const usewordListCacheStore = defineStore(
  "wordListCache",
  () => {
    const wordListData = ref<wordList | null>(null);

    const setWordList = (newWordList: wordList) => {
      wordListData.value = newWordList;
    }

    const getWordList = () => {
      return wordListData.value;
    }

    const clearWordList = () => {
      wordListData.value = null;
    }


    return {
      wordListData,
      setWordList,
      getWordList,
      clearWordList
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
