module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["/stories/*.js"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-restricted-syntax": "off",
    "no-named-as-default": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "prefer-regex-literals": "off",
    "prefer-template": "off",
    "prefer-destructuring": "off",
    "consistent-return": "off",
    radix: "off",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx"],
      },
    },
  },
};
