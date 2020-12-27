const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpackOptimization = require("./webpack-optimization")

const { plugins, ...restConfig } = require("./webpack.common.config")

const prodConfig = merge(restConfig, {
  plugins: [
    ...plugins,
    new CleanWebpackPlugin({
      verbose: true,
      // dry: true,
      cleanOnceBeforeBuildPatterns: ["index.html", "static/scripts/*"],
    }),
  ],
  optimization: webpackOptimization,
})

module.exports = prodConfig
