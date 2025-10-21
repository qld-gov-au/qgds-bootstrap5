import { defineConfig } from "eslint/config";
import globals from "globals";
import json from "@eslint/json";
import storybookPlugin from "eslint-plugin-storybook"; // Storybook plugin

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  {
    plugins: {
      json,
      storybook: storybookPlugin,
    },
  },
  {
    ignores: [
      "*.min.js",
      "storybook-static/**",
      "dist/**",
      "src/js/handlebars.init.cjs",
      "package-lock.json",
    ], // Ensure this is at the top level
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
]);
