<script setup lang="ts">
import "vue-sonner/style.css";

</script>

<template>
  <NuxtLayout>
    <Toaster position="top-center" rich-colors />
    <NuxtPage />
    <LoginDialog></LoginDialog>
  </NuxtLayout>
</template>
