// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import tsParser from "@typescript-eslint/parser";

export default withNuxt(
  // Your custom configs here
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: {
          extends: "./tsconfig.json",
          include: ["app/**/*.ts", "app/**/*.vue", "nuxt.config.ts"],
        },
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  }
);
