import webpack, { HotModuleReplacementPlugin } from "webpack"
import { merge } from "webpack-merge"

import commonConfig from "./webpack.common.config"
import Paths from "./paths"

const devConfig: webpack.Configuration = merge(commonConfig, {
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
    new HotModuleReplacementPlugin(),
  ]
})

export default devConfig
