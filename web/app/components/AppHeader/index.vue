<script lang="ts" setup>
import {
  Avatar,
  AvatarFallback,
  //  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import LoginAccount from "@/components/LoginAccount/index.vue";
import NavMenu from "@/components/NavMenu/index.vue";

// const dialogOpen = ref(false);
</script>
<template>
  <div
    class="w-full h-[56px] bg-white border-b border-grid flex items-center px-[10px] sticky top-0 z-50"
  >
    <div class="flex-1 flex justify-center">
      <NavMenu />
    </div>
    <div class="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <!-- <AvatarImage src="https://github.com/unovue.png" alt="@unovue" /> -->
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>账户信息</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <NuxtLink to="/login">请登录</NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <!-- <LoginAccount v-model:open="dialogOpen" /> -->
  </div>
</template>
