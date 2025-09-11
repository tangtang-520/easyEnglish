<script setup lang="ts">
import { ref } from "vue"
// import { toast } from "vue-sonner" 
import { randomWordApi } from "~/api";
import { useQuery } from "@tanstack/vue-query";

// 学习进度
const progress = ref(0)

const { data:wordList } = useQuery({
  queryKey: ["randomWord"],
  queryFn: randomWordApi,
})

watch( ()=> wordList.value, () => {
  console.log(wordList.value);
  
} )

const showMeaning = ref(true)
const celebrate = ref(false)

const meaning =  computed( ()=> {
  return wordList.value?.data?.wordInfo?.[progress.value]?.translation || "暂无释义"
} )

const currentWord = computed( ()=> {
  return wordList.value?.data?.wordInfo?.[progress.value]?.word  || ""
} )


// const checkAnswer = () => {
//   const answer = letters.join("").toLowerCase()
//   if (answer === currentWord.value.toLowerCase()) {
//     toast.success("✅ 答对啦！继续加油～")
//     celebrate.value = true
//     progress.value = Math.min(progress.value + 10, 100)
//     showMeaning.value = true
//   } else {
//     toast.error("❌ 错误，再试一次吧～")
//   }
// }

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
          <Progress v-model="progress"  />
          <p class="mt-2 text-sm text-muted-foreground">
            学习进度：{{ progress }}%
          </p>
        </div>
      </CardHeader>

      <!-- 输入框下划线样式 -->
      <CardContent class="mt-6 flex justify-center">
        <WordInput :index-error="[0,1]"   :length="currentWord.length" />
      </CardContent>

      <!-- 提交按钮 -->
      <CardContent class="flex justify-center mt-4">
        <Button size="lg">提交</Button>
      </CardContent>

      <!-- 单词释义 -->
      <CardContent v-if="showMeaning" class="mt-4">
        <Alert>
          <AlertTitle>释义</AlertTitle>
          <AlertDescription>{{ meaning }}</AlertDescription>
        </Alert>
      </CardContent>

      <!-- 答对庆祝 -->
      <CardFooter v-if="celebrate" class="justify-center">
        <div class="text-green-600 text-xl font-bold animate-bounce">
          🎉 恭喜你答对啦！
        </div>
      </CardFooter>
    </Card>
  </div>
</template>