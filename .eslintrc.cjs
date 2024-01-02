module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": [1, 2],
    "one-var": 2,
    "no-tabs": 1,
    "no-path-concat": 0,
    "valid-jsdoc": "warn",
    "spaced-comment": 0,
    "space-before-blocks": 0,
    "space-before-function-paren": 0,
    "comma-dangle": [1, "always-multiline"],
    "eol-last": 1,
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
    }
}
