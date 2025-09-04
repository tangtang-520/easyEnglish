<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-1">
      <slot></slot>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
