module.exports = {
  presets: [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": 3,
    }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "style": "css",
    }],
    ["@babel/plugin-transform-runtime", {
      "corejs": 3,
    }],
    "react-hot-loader/babel",
  ]
}
