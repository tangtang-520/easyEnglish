<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { searchWordApi } from "@/api/dictionary";
import {
  Loader2,
  Volume2,
  BookOpen,
  Star,
  Award,
  Clock,
  Target,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

const query = ref("");
const result = ref<{
  sw: string;
  word: string;
  translation: string;
  definition: string;
  phonetic: string;
  oxford: number;
  collins: number;
  exchange: string;
  tag: string;
} | null>(null);

const { data, refetch, isLoading } = useQuery({
  queryKey: ["searchWord"],
  queryFn: () => searchWordApi({ word: query.value }),
  enabled: false,
  retry: false,
});

const searchWord = async () => {
  if (!query.value) {
    result.value = null;
    return;
  }
  await refetch();
  if(data.value?.data.wordInfo=== null){
    toast.warning("未找到该单词");
    return;
  };
  result.value = data.value?.data.wordInfo || null;
};

// 翻译内容 格式化
const formatTranslation = (translation: string) => {
  return translation.replace(/\\n/g, "\n");
};

// 时态格式化
const exchangeFormat = (exchange: string) => {
  if (!exchange) return "";
  return exchange
    .split("/") // 按 "/" 分割
    .map((item) => item.split(":")[1]) // 取 ":" 后面的部分
    .join(", ");
};

// 等级格式化
const examMap: Record<string, string> = {
  cet4: "四级",
  cet6: "六级",
  cet8: "八级",
  ky: "考研",
  toefl: "托福",
  ielts: "雅思",
  gre: "研究生考试",
};
const tagFormat = (tag: string) => {
  if (!tag) return "";
  return tag
    .split(/\s+/)
    .map((item) => examMap[item] || "")
    .join(" ");
};

// 发音功能
const playPronunciation = (type: string) => {
  if (result.value?.sw) {
    const utterance = new SpeechSynthesisUtterance(result.value.sw);
    utterance.lang = `en-${type}`;
    speechSynthesis.speak(utterance);
  }
};
</script>

<template>
  <div class="min-h-screen h-auto bg-background p-4 md:p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <!-- 页面标题 -->
      <div class="text-center space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">英语词典查询</h1>
        <p class="text-muted-foreground text-lg">
          快速查找单词释义、音标和用法
        </p>
      </div>

      <!-- 查询输入区域 -->
      <div class="h-auto flex flex-col sm:flex-row gap-4">
        <Input
          v-model="query"
          placeholder="请输入要查询的英语单词..."
          class="flex-1 h-12 min-h-12 text-base"
          @keyup.enter="searchWord"
        />
        <Button
          size="lg"
          :disabled="isLoading"
          @click="searchWord"
          class="h-12 px-8"
        >
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          <BookOpen v-else class="mr-2 h-4 w-4" />
          {{ isLoading ? "查询中..." : "查询" }}
        </Button>
      </div>

      <!-- 查询结果展示 -->
      <transition name="fade" mode="out-in">
        <div v-if="result" class="space-y-6">
          <!-- 单词信息卡片 -->
          <Card>
            <CardHeader class="pb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <CardTitle class="text-3xl font-bold">{{
                    result.sw
                  }}</CardTitle>
                  <div class="flex items-center">
                    <span>英</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="playPronunciation('GB')"
                      class="h-8 w-8 p-0"
                    >
                      <Volume2 class="h-4 w-4" />
                    </Button>
                  </div>
                  <div class="flex items-center">
                    <span>美</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="playPronunciation('US')"
                      class="h-8 w-8 p-0"
                    >
                      <Volume2 class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div class="flex gap-2">
                  <Badge v-if="result.oxford" variant="default" class="gap-1">
                    <Star class="h-3 w-3" />
                    Oxford
                  </Badge>
                  <Badge
                    v-if="result.collins"
                    variant="secondary"
                    class="gap-1"
                  >
                    <Award class="h-3 w-3" />
                    Collins
                  </Badge>
                </div>
              </div>
              <div
                v-if="result.phonetic"
                class="text-muted-foreground font-mono text-lg"
              >
                [{{ result.phonetic }}]
              </div>
            </CardHeader>

            <CardContent class="space-y-6">
              <!-- 释义 -->
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <BookOpen class="h-5 w-5 text-primary" />
                  <h3 class="text-lg font-semibold">释义</h3>
                </div>
                <div class="rounded-lg border bg-muted/50 p-4">
                  <p
                    class="whitespace-pre-line text-foreground leading-relaxed"
                  >
                    {{ formatTranslation(result.translation) }}
                  </p>
                </div>
              </div>

              <!-- 时态 -->
              <div v-if="result.exchange" class="space-y-3">
                <div class="flex items-center gap-2">
                  <Clock class="h-5 w-5 text-primary" />
                  <h3 class="text-lg font-semibold">时态</h3>
                </div>
                <div class="rounded-lg border bg-muted/50 p-4">
                  <span class="text-foreground">{{
                    exchangeFormat(result.exchange)
                  }}</span>
                </div>
              </div>

              <!-- 标签 -->
              <div v-if="result.tag" class="space-y-3">
                <div class="flex items-center gap-2">
                  <Target class="h-5 w-5 text-primary" />
                  <h3 class="text-lg font-semibold">适用考试</h3>
                </div>
                <div v-if="tagFormat(result.tag)">
                  <Badge variant="outline" class="gap-1">
                    <Award class="h-3 w-3" />
                    {{ tagFormat(result.tag) }}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- 空状态 -->
        <Card v-else>
          <CardContent
            class="flex flex-col items-center justify-center py-16 text-center"
          >
            <div class="rounded-full bg-muted p-6 mb-4">
              <BookOpen class="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 class="text-xl font-semibold mb-2">请输入单词进行查询</h3>
            <p class="text-muted-foreground max-w-sm">
              在上方输入框中输入英语单词，获取详细的释义、音标和词形变化信息
            </p>
          </CardContent>
        </Card>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* 渐入渐出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
