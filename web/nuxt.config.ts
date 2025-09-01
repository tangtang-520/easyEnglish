// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // 公共变量（前端和服务端都可访问）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000/api",
    },
  },
  css: ["~/assets/css/normalize.css", "~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "shadcn-nuxt",
    "@formkit/auto-animate/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./app/components/ui",
  },
});
