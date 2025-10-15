<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from 'pinia';
// import { toast } from "vue-sonner"
import { randomWordApi } from "~/api";
import { useQuery } from "@tanstack/vue-query";
import { usewordListCacheStore } from "~/stores";


// 学习进度
const progress = ref(0);
const { wordListData } = storeToRefs(usewordListCacheStore()) ;
const { setWordList } = usewordListCacheStore();


const { data: wordList, isLoading } = useQuery({
  queryKey: ["randomWordData"],
  queryFn: async () => {
    try {
      const data = await randomWordApi();
      setWordList(data.data.wordInfo);
      return data.data.wordInfo || [];
    } catch (error) {
      console.error("Error fetching random words:", error);
      return [];
    }
  },
  // 仅在没有缓存数据时才启用查询
  enabled: !Array.isArray(wordListData.value) || wordListData.value.length === 0,  
});
const celebrate = ref(false);

// 优先使用store缓存，如果没有则使用请求的数据
const effectiveWordList = computed(() => {
  if (wordListData.value) {
    return wordListData.value;
  }
  return wordList.value || []
})

const meaning = computed(() => {
  if(isLoading.value && !effectiveWordList.value.length) {
    return "";
  }
  return effectiveWordList.value[progress.value]?.translation || "暂无释义";
});

const currentWord = computed(() => {
  if(isLoading.value && !effectiveWordList.value.length) {
    return "";
  }
  return effectiveWordList.value[progress.value]?.word || "";
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-muted/40 p-6">
    <!-- Sonner toaster 挂载点 -->
    <!-- <Sonner position="top-center" /> -->

    <Card class="w-full max-w-lg shadow-lg">
      <!-- 顶部进度条 -->
      <CardHeader class="text-center space-y-2">
        <CardTitle class="text-2xl font-bold">单词默写</CardTitle>
        <CardDescription>拼出单词，完成练习</CardDescription>

        <div class="mt-4">
          <Progress v-model="progress" :max="effectiveWordList.length" />
          <p class="mt-2 text-sm text-muted-foreground">
            学习进度：{{ progress + 1 }}/{{ effectiveWordList.length }}
          </p>
        </div>
      </CardHeader>

      <CardContent  class="mt-4">
        <Alert>
          <AlertTitle>释义</AlertTitle>
          <AlertDescription>{{ meaning }}</AlertDescription>
        </Alert>
      </CardContent>

      <!-- 输入框下划线样式 -->
      <CardContent class="mt-6 flex justify-center">
        <WordInput :index-error="[0, 1]" :length="currentWord?.length || 0" />
      </CardContent>

      <!-- 提交按钮 -->
      <CardContent class="flex justify-center mt-4">
        <Button size="lg">提交</Button>
      </CardContent>

      <!-- 单词释义 -->


      <!-- 答对庆祝 -->
      <CardFooter v-if="celebrate" class="justify-center">
        <div class="text-green-600 text-xl font-bold animate-bounce">
          🎉 恭喜你答对啦！
        </div>
      </CardFooter>
    </Card>
  </div>
</template>