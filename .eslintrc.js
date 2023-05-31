module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    camelcase: "off",
    "prettier/prettier": "error",
    "class-methods-use-this": [
      "error",
      { exceptMethods: ["store", "index", "show", "update", "delete"] },
    ],
  },
};
