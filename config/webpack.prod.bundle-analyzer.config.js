const { merge } = require("webpack-merge")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const { plugins, ...restConfig } = require("./webpack.prod.config")

const devConfig = merge(restConfig, {
  // @ts-ignore
  plugins: [
    ...plugins,
    // @ts-ignore
    new BundleAnalyzerPlugin({
      // treemap sizes 为 parsed 时, bundle 分析页不会展示各项的详细信息
      // defaultSizes: "parsed"
    })
  ],
})

module.exports = devConfig
