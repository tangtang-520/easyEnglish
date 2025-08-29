<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <NuxtLayout>
    <Toaster position="top-center" rich-colors />
    <NuxtPage />
  </NuxtLayout>
</template>
