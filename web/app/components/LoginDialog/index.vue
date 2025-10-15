<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLoginDialog } from "~/composables/useLoginDialog";
import { useUserInfoStore } from "~/stores/modules/userInfo";
import { useRouter } from "vue-router";

const router = useRouter();
const { clearUserInfo } = useUserInfoStore();
const { isLoginDialogVisible } = useLoginDialog();
const handleLoginClick = () => {
  isLoginDialogVisible.value = false;
  clearUserInfo();
  router.push({
    name: "login",
  });
};
</script>

<template>
  <AlertDialog :open="isLoginDialogVisible">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>请重新登录!</AlertDialogTitle>
        <AlertDialogDescription>
          令牌失效请重新登录
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="isLoginDialogVisible = false"
          >取消</AlertDialogCancel
        >
        <AlertDialogAction @click="handleLoginClick"
          >前往登录</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
