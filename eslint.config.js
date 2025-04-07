// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,

  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: "@swc/eslint-parser", // or tseslint.parser if you're not using swc
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
          json: "never",
        },
      ],
      "react/no-unstable-nested-components": "off",
      camelcase: "off",
      "react/function-component-definition": "off",
      "no-use-before-define": "off",
      "no-shadow": "off",
      "no-useless-escape": "off",
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          tabWidth: 2,
          semi: true,
          printWidth: 80,
          singleQuote: true,
          useTabs: false,
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "react/jsx-curly-newline": "off",
      "no-console": "off",
      indent: "off",
      "implicit-arrow-linebreak": 0,
      "import/no-unresolved": [2, { caseSensitive: false }],
      "operator-linebreak": 0,
      "react/prop-types": "off",
      "object-curly-newline": 0,
      "jsx-a11y/no-static-element-interactions": [
        "error",
        {
          handlers: [
            "onClick",
            "onMouseDown",
            "onMouseUp",
            "onKeyPress",
            "onKeyDown",
            "onKeyUp",
          ],
        },
      ],
      "react/jsx-curly-brace-presence": 0,
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "import/prefer-default-export": "off",
      "no-confusing-arrow": 0,
      "no-underscore-dangle": 0,
      "spaced-comment": 0,
      "no-param-reassign": 0,
      "import/no-cycle": "off",
      "function-paren-newline": "off",
      "jsx-a11y/media-has-caption": [
        2,
        {
          audio: ["Audio"],
          video: ["Video"],
          track: ["Track"],
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-wrap-multilines": [
        "error",
        { declaration: false, assignment: false, return: true },
      ],
    },
  },
]);
