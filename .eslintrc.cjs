module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": ["eslint:recommended", "plugin:json/recommended", "plugin:storybook/recommended"],
  "overrides": [
    {
      "env": {
        "node": true,
      },
      "files": [
        ".eslintrc.{js,cjs}",
      ],
      "parserOptions": {
        "sourceType": "script",
      },
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "@stylistic/js",
  ],
  "rules": {
    "@stylistic/js/indent": ["warn", 2],
    "one-var": 0,
    "no-tabs": 0,
    "no-path-concat": 0,
    "valid-jsdoc": "warn",
    "spaced-comment": 0,
    "space-before-blocks": 0,
    "space-before-function-paren": 0,
    "comma-dangle": [1, "always-multiline"],
    "eol-last": 1,
    "no-mixed-spaces-and-tabs": 0,
    "no-multi-spaces": [
      2,
      {
        "exceptions": {
          "Property": true,
          "VariableDeclarator": true,
          "ImportDeclaration": true,
          "ObjectExpression": true,
        },
      },
    ],
    "no-warning-comments": 1,
  },
}
