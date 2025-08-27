<template>
  <div class="w-full h-full">
    <AppHeader />
    <ScrollArea class="flex-1">
      <slot />
    </ScrollArea>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "~/components/AppHeader/index.vue";
import AppFooter from "~/components/AppFooter/index.vue";
import { ScrollArea } from "@/components/ui/scroll-area";
</script>

<style scoped></style>
