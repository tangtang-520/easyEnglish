<script lang="ts" setup>
const { hasToken, clearUserInfo } = useUserInfoStore();
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
            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>账户信息</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <NuxtLink v-if="!hasToken" to="/login">请登录</NuxtLink>
            <NuxtLink v-else to="/user">个人中心</NuxtLink>
          </DropdownMenuItem>
           <DropdownMenuItem>
            <div @click="clearUserInfo">退出登录</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
  </div>
</template>
