<script setup lang="ts">
const progress = ref(20)
</script>

<template>
  <div>
    <!-- 单词默写进度条 -->
    <Progress v-model="progress" class="w-3/5 m-auto mt-10" />
    <!-- 默写单词部分 -->
    <div>
        
    </div>
    <!-- 单词释义 -->
    <div></div>
    <!-- 庆祝单词填写正确 -->
    <div></div>
  </div>
</template>

<style scoped></style>
