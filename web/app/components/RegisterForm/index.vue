<script setup lang="ts">
import type { LoginRequest } from "@/api/types";
import { cn } from "@/lib/utils";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { registerUserApi } from "@/api/user";
import { useMutation } from "@tanstack/vue-query";
import { Loader2, Eye, EyeOff } from "lucide-vue-next";
import { toast } from "vue-sonner";

const emit = defineEmits(["changTab"]);
const formSchema = toTypedSchema(
  z.object({
    username: z
      .string({ message: "请输入账号" })
      .min(3, { message: "账号长度最小3位字符" })
      .max(40, { message: "账号长度最大40位字符" }),
    password: z
      .string({ message: "请输入密码" })
      .min(8, { message: "密码长度最小8位字符" })
      .max(16, { message: "密码长度最大16位字符" })
      .regex(/^[A-Za-z\d]+$/, { message: "密码只能包含字母和数字" }),
    email: z.email({ message: "请输入正确邮箱" }).optional().or(z.literal("")),
  })
);

const passType = ref<string>("password");
const changPass = () => {
  passType.value = passType.value === "password" ? "text" : "password";
};

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { isPending, mutate: registerMutation } = useMutation({
  mutationKey: ["userRegister"],
  mutationFn: (values: LoginRequest) => registerUserApi(values),
});

const onSubmit = handleSubmit((values) => {
  registerMutation(values, {
    onSuccess: () => {
      toast.success("注册成功");
    },
  });
});

const toLogin = () => {
  emit("changTab", "login");
};
</script>

<template>
  <form :class="cn('flex flex-col gap-6')" @submit="onSubmit">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">注册</h1>
      <p class="text-balance text-sm text-muted-foreground">
        注册账号可以获得更多功能
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-2">
        <FormField
          v-slot="{ componentField }"
          name="username"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>账号</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="请输入账号或邮箱"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid gap-2">
        <FormField
          v-slot="{ componentField }"
          name="password"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>
              <span>密码</span>
            </FormLabel>
            <div class="relative w-full max-w-sm items-center">
              <FormControl>
                <Input
                  id="search"
                  :type="passType"
                  placeholder="请输入密码"
                  v-bind="componentField"
                  class="pr-[40px]"
                />
                <span
                  class="absolute right-[0px] top-1/2 transform -translate-y-1/2 flex items-center justify-center px-2"
                  @click="changPass"
                >
                  <Eye
                    v-if="passType === 'password'"
                    class="size-6 text-muted-foreground"
                  />
                  <EyeOff v-else class="size-6 text-muted-foreground" />
                </span>
              </FormControl>
            </div>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid gap-2">
        <FormField
          v-slot="{ componentField }"
          name="email"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>
              <span>邮箱</span>
            </FormLabel>
            <FormControl>
              <Input
                id="search"
                type="text"
                placeholder="请输入邮箱"
                v-bind="componentField"
                class="pr-[40px]"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit" :disabled="isPending" class="w-full">
        <Loader2 v-if="isPending" class="animate-spin" />
        注册
      </Button>
    </div>
    <div class="text-center text-sm">
      有账号？
      <a href="#" class="underline underline-offset-4" @click.prevent="toLogin"
        >前往登录</a
      >
    </div>
  </form>
</template>
