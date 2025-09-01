export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("authToken");
  // 有token 且 访问的是登录页 则直接跳转到首页
  if (token.value && to.path === "/login") {
    return navigateTo("/", { redirectCode: 301 });
  }
});
