<script setup lang="ts">
import { motion } from "motion-v";

const props = defineProps<{
  // 单词长度
  length: number;
  // 第几个单词错误
  indexError: number[];
}>();

const wordVal = ref<string[]>([]);
// 用于跟踪每个 input 的焦点状态
const isFocused = ref<boolean[]>(Array(5).fill(false));

const handleInput = (e: Event, index: number) => {
  e.preventDefault();
  const target = e.target as HTMLInputElement;
  wordVal.value[index] = target.value.slice(-1);
  if (target.value && target.nextElementSibling instanceof HTMLInputElement) {
    target.nextElementSibling.focus();
  }
  console.log(wordVal.value);
};

const handleDelete = (e: Event, index: number) => {
  e.preventDefault();
  const target = e.target as HTMLInputElement;

  // 如果当前输入框有内容，只清空内容，不移动焦点
  if (target.value) {
    target.value = "";
    wordVal.value = [...wordVal.value];
    wordVal.value[index] = "";
  } else {
    // 如果当前输入框为空，则移动焦点到前一个输入框
    if (target.previousElementSibling instanceof HTMLInputElement) {
      target.previousElementSibling.focus();
    }
  }
  console.log(wordVal.value);
};

// 处理焦点事件
const handleFocus = (index: number) => {
  isFocused.value[index] = true;
};

const handleBlur = (index: number) => {
  isFocused.value[index] = false;
};

// 处理左右箭头键移动
const handleKeyDown = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (target.previousElementSibling instanceof HTMLInputElement) {
      target.previousElementSibling.focus();
    }
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    if (target.nextElementSibling instanceof HTMLInputElement) {
      target.nextElementSibling.focus();
    }
  }
};
</script>

<template>
  <div class="w-full mx-1 flex justify-center">
    <motion.input
      :initial="{ 
        opacity: 0, 
        y: 20,
        scale: 0.8
      }"
      :animate="{ 
        opacity: 1, 
        y: isFocused[index] ? 0 : [0, -10, 0],
        scale: 1
      }"
      :transition="{
        opacity: { 
          duration: 0.6, 
          delay: index * 0.1, 
          ease: 'easeOut'
        },
        y: props.indexError.includes(index) && !isFocused[index]
          ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.3, ease: 'easeOut' },
        scale: { duration: 0.4, ease: 'easeOut' }
      }"
      type="text"
      v-for="(item, index) in props.length"
      :key="index"
      maxlength="1"
      v-model="wordVal[index]"
      @input="(e) => handleInput(e, index)"
      @keydown.delete="(e: Event) => handleDelete(e, index)"
      @keydown="(e: KeyboardEvent) => handleKeyDown(e)"
      @focus="handleFocus(index)"
      @blur="handleBlur(index)"
      class="w-full h-12 mx-[5px] text-center text-lg font-medium border-b-2 border-gray-400 focus:border-primary outline-none bg-transparent"
      :class="{ 'border-red-500': props.indexError.includes(index) }"
    />
  </div>
</template>

<style scoped></style>