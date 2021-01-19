import webpack from "webpack"
import * as path from "path"

import HtmlWebpackPlugin from "html-webpack-plugin"
import chalk from "chalk"
import clipboardy from "clipboardy"
import { InjectStringWebpackPlugin } from "inject-string-webpack-plugin"

import { resolve, rules } from "./common-loaders"
import Paths from "./paths"
import {
  isProduction, prefix, suffix, externals, packageJson,
} from "./constants"

import { envConfig } from "./env.local"

const definePluginOption = Object.entries(envConfig).reduce((prev, [key, val]) => {
  prev[`process.env.${key}`] = JSON.stringify(val)
  return prev
}, {})

const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "inline-cheap-module-source-map",
  entry: {
    index: ["react-hot-loader/patch", path.resolve(Paths.Src, "index.tsx")],
  },
  // 使输出更精简
  stats: "errors-warnings",
  // externals 应当在/config/Constants.js文件中声明, 不建议在此修改配置逻辑
  externals: isProduction ? externals : {},
  output: {
    path: Paths.Dist,
    filename: "static/scripts/[name].js",
    chunkFilename: "static/scripts/chunk-[name].js",
    libraryTarget: "umd",
  },
  resolve: {...resolve},
  module: {
    rules: [...rules],
  },
  plugins: [
    !isProduction && new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: "index.html",
      inject: "body",
      chunks: ["index"],
      favicon: path.join(Paths.Public, "favicon.ico"),
      hash: true,
      title: packageJson.name,
    }),
    isProduction && new InjectStringWebpackPlugin({
      test: /static[/\\]scripts[/\\]index\..*js/g,
      prefix,
      suffix,
      afterInject: (assetName, asset) => {
        clipboardy.writeSync(asset.source())
        console.log(chalk.green("【copied】"))
      },
    }),
    new webpack.WatchIgnorePlugin([
      /\.d\.ts$/,
    ]),
    new webpack.ProgressPlugin({
      modules: true,
    }),
    new webpack.DefinePlugin(definePluginOption),
  ].filter(Boolean),
}

export default config
