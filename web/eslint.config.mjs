// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    rules: {
      "vue/attributes-order": "off",
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: 'always', 
            normal: "never", // normal elements should always have a closing tag
          },
          svg: "always",
          math: "always",
        },
      ],
    },
  }
);
