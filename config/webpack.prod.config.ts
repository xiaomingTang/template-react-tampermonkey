import webpack from "webpack"
import { merge } from "webpack-merge"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import webpackOptimization from "./webpack-optimization"

import commonConfig from "./webpack.common.config"

const prodConfig = merge(commonConfig, {
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      // dry: true,
      cleanOnceBeforeBuildPatterns: ["index.html", "static/scripts/*"],
    }),
  ],
  optimization: webpackOptimization,
})

export default prodConfig
