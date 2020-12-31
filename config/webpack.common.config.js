const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const chalk = require("chalk")
const clipboardy = require("clipboardy")
const { InjectStringWebpackPlugin } = require("inject-string-webpack-plugin")

const { resolve, rules } = require("./common-loaders")
const Paths = require("./paths")
const {
  isProduction,
  prefix,
  suffix,
  externals,
  package,
} = require("./Constants")

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "inline-cheap-module-source-map",
  entry: {
    index: path.resolve(Paths.Src, "index.tsx"),
  },
  // 使输出更精简
  stats: "errors-warnings",
  // externals 应当在/config/Constants.js文件中声明, 不建议在此修改配置逻辑
  externals: isProduction ? externals : {},
  output: {
    path: Paths.Dist,
    filename: "static/scripts/[name].js",
    chunkFilename: isProduction
      ? "static/scripts/chunk-[name].js"
      : "static/scripts/chunk-[name].js",
    libraryTarget: "umd",
  },
  resolve: {...resolve},
  module: {
    rules: [...rules],
  },
  plugins: [
    isProduction ? null : new HtmlWebpackPlugin({
      template: path.join(Paths.Public, "index.html"),
      filename: "index.html",
      inject: "body",
      chunks: ["index"],
      favicon: path.join(Paths.Public, "favicon.ico"),
      hash: true,
      title: package.name,
    }),
    new webpack.WatchIgnorePlugin([
      /\.d\.ts$/,
    ]),
    isProduction ? new InjectStringWebpackPlugin({
      test: /static[/\\]scripts[/\\]index\..*js/g,
      prefix,
      suffix,
      afterInject: (assetName, asset) => {
        clipboardy.writeSync(asset.source())
        console.log(chalk.green("【copied】"))
      },
    }) : null,
  ].filter(Boolean),
}
