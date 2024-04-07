module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
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
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "rules": {
    "sort-keys": "off",
    "react-in-jsx-scope": "off",
    "no-extra-semi": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/indent": [1, 2],
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-empty-interface": 0,
  }
}
