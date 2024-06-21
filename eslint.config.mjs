import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-console": "warn",
      "no-undef": "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
    },
    ignores: ["**/node_modules/", ".dist/"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];