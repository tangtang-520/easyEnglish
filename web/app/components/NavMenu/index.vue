<script setup lang="ts">
const route = useRoute();
const currentPath = computed(() => route.path);
const menu = [
  {
    name: "首页",
    path: "/",
  },
  {
    name: "词典",
    path: "/dictionary",
  },
  {
    name: "翻译",
    path: "/translate",
  },
];
</script>

<template>
  <header class="header-nav">
    <div>
      <NuxtLink
        class="mx-4 text-neutral-500"
        v-for="item in menu"
        :key="item.name"
        :to="item.path"
        :class="item.path === currentPath ? 'text-neutral-950 font-bold' : ''"
        >{{ item.name }}</NuxtLink
      >
    </div>
  </header>
</template>

<style scoped></style>
