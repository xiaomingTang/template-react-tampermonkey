const { HotModuleReplacementPlugin } = require("webpack")
const { merge } = require("webpack-merge")

const { plugins = [], ...restConfig } = require("./webpack.common.config")
const Paths = require("./paths")

const devConfig = merge(restConfig, {
  devServer: {
    contentBase: Paths.Dist,
    // https: true,
    host: "0.0.0.0",
    port: 8080,
    useLocalIp: true,
    // publicPath: "/dist", // 此路径下的打包文件可在浏览器中访问
    hot: true,
    open: true,
    openPage: "./index.html",
    // overlay: true,
    // quiet: true,
  },
  plugins: [
    ...plugins,
    new HotModuleReplacementPlugin(),
  ]
})

module.exports = devConfig
