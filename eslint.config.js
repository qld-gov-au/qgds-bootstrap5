import { defineConfig } from "eslint/config";
import globals from "globals";
import json from "@eslint/json";
import storybookPlugin from "eslint-plugin-storybook";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import litPlugin from "eslint-plugin-lit";
import wcPlugin from "eslint-plugin-wc";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  {
    plugins: {
      json,
      storybook: storybookPlugin,
      "@typescript-eslint": tseslint,
      lit: litPlugin,
      wc: wcPlugin,
    },
  },
  {
    ignores: [
      "*.min.js",
      "storybook-static/**",
      "dist/**",
      "docs/**",
      "src/js/handlebars.init.cjs",
      "src/js/handlebars.partials.js",
      "package-lock.json",
      "node_modules/**",
    ],
  },
  {
    files: ["*.js", "*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.es2021, // Use recommended globals for ES2021
    },

    rules: {
      "one-var": 0,
      "no-tabs": 0,
      "no-path-concat": 0,
      // "valid-jsdoc": "warn",
      "spaced-comment": 0,
      "space-before-blocks": 0,
      "space-before-function-paren": 0,
      "comma-dangle": [1, "always-multiline"],
      "eol-last": 1,
      "no-mixed-spaces-and-tabs": 0,
      "no-multi-spaces": [
        2,
        {
          exceptions: {
            Property: true,
            VariableDeclarator: true,
            ImportDeclaration: true,
            ObjectExpression: true,
          },
        },
      ],
      "no-warning-comments": 1,
    },
  },
  {
    files: ["**/*.json"],
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
      "json/no-empty-keys": "error",
      "json/no-unnormalized-keys": "error",
      "json/no-unsafe-values": "error",
    },
  },
  {
    files: [".eslintrc.{js,cjs}"],
    languageOptions: {
      sourceType: "script", // For CommonJS files
    },
  },
  // TypeScript configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  // Lit/Web Components configuration
  {
    files: ["**/*.ts", "**/*.js"],
    rules: {
      ...litPlugin.configs.recommended.rules,
      ...wcPlugin.configs.recommended.rules,
    },
  },
]);
