module.exports = {
  presets: ["next/babel"],
  plugins: [
    "babel-plugin-styled-components",
    "babel-plugin-root-import",
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        root: ["./src"],
        alias: {
          Analytics: "./src/analytics",
          Components: "./src/components",
          "react-native": "react-native-web",
          "react-native-svg": "react-native-svg-web-transform",
        },
      },
    ],
    ["react-native-web", { commonjs: true }],
  ],
}
