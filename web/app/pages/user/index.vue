<script setup lang="ts">
const { userInfo } = useUserInfoStore();
</script>

<template>
  <div class="max-w-[1200px] m-auto p-2.5 flex justify-around flex-wrap gap-10 py-10">
    <Card class="w-[500px] hover:shadow-lg transition transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
        <CardDescription>坚持每天进步一点点</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-4">
          <Avatar class="w-16 h-16 rounded">
            <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div class="text-xl font-bold">{{ userInfo?.username }}</div>
            <div class="text-gray-500 text-sm">邮箱：{{ userInfo?.email }}</div>
          </div>
        </div>
      </CardContent>
      
    </Card>
    <Card class="w-[500px] hover:shadow-lg transition transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>学习进度</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-4">
          <div class="bg-gray-200 h-3 rounded">
            <div class="bg-blue-500 h-3 rounded w-2/3"></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-100 rounded text-center">学习时间</div>
          <div class="p-4 bg-gray-100 rounded text-center">学习单词数</div>
        </div>
      </CardContent>
      <!-- <CardFooter> Card Footer </CardFooter> -->
    </Card>
    <Card class="w-[500px] hover:shadow-lg transition transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>学习数据</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="mb-4">
          <div class="bg-gray-200 h-3 rounded">
            <div class="bg-blue-500 h-3 rounded w-2/3"></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-100 rounded text-center">学习时间</div>
          <div class="p-4 bg-gray-100 rounded text-center">学习单词数</div>
        </div>
      </CardContent>
    
    </Card>
    <Card class="w-[500px] hover:shadow-lg transition transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle>学习工具</CardTitle>
      </CardHeader>
      <CardContent class="flex gap-4">
        <button class="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">错题本</button>
        <button class="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">学习记录</button>
      </CardContent>
     
    </Card>
  </div>
</template>

<style scoped></style>
