module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-jsx",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/react",
    "plugin:react-hooks/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/"],
  overrides: [
    {
      files: ["**/*.js", "**/*.spec.ts", "**/.*.test.ts"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "no-undef": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "no-loops", "@typescript-eslint", "eslint-plugin-import", "react-hooks"],
  rules: {
    radix: 2,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-loops/no-loops": 2,
    "import/order": 2,
    "import/no-self-import": 2,
    "import/first": 2,
    "import/newline-after-import": 2,
    "jsx-quotes": ["error", "prefer-double"],
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/generic-type-naming": 2,
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        prefixWithI: "never",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1, 2] }],
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/no-namespace": [2, { allowDeclarations: true }],
    "react-hooks/exhaustive-deps": "error",
    "react/prefer-stateless-function": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
        readonly: "array",
      },
    ],
    "require-await": "error",
  },
}
