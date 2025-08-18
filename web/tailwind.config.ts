// tailwind.config.ts
import type { Config } from "tailwindcss"

export default <Partial<Config>>{
  content: [
    "./components/**/*.{vue,ts,tsx}",   // 普通组件
    "./components/ui/**/*.{vue,ts,tsx}", // ✅ shadcn-vue 生成的组件
    "./pages/**/*.{vue,ts,tsx}",        // Nuxt 页面
    "./app/**/*.{vue,ts,tsx}",          // Nuxt app 目录
  ],
  theme: {
    extend: {
      colors: {
        // 你可以在这里扩展 theme，比如 shadcn 常用的主题色
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}