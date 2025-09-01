<script lang="ts" setup>
import placeholderImg from "@/assets/images/svgs/placeholder.svg";
definePageMeta({
  layout: false,
});

const tabValue = ref<string>("login");
const changTab = (type: "login" | "signUp") => {
  tabValue.value = type;
};
</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-center gap-2 md:justify-start">
        <a href="/" class="flex items-center gap-2 font-medium">
          Easy English.
        </a>
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <Tabs v-model="tabValue" class="w-full">
            <TabsList class="w-full">
              <TabsTrigger value="login"> 登录 </TabsTrigger>
              <TabsTrigger value="signUp"> 注册 </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signUp">
              <RegisterForm @chang-tab="changTab" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    <div class="relative hidden bg-muted lg:block">
      <NuxtImg
        :src="placeholderImg"
        alt="Nuxt Icon"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
