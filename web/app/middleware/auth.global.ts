export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("authToken");
  const whiteList = ["/login", "/register"];

  // 没有token 且 访问的不是登录页 则跳转到登录页
  if (!token.value && !whiteList.includes(to.path)) {
    return navigateTo("/login", { redirectCode: 301 });
  }
});
