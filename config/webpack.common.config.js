const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const autoprefixer = require("autoprefixer")
const CopyPlugin = require("copy-first-asset-webpack-plugin").default
const tsImportPluginFactory = require("ts-import-plugin")

const Paths = require("./Paths")
const {
  isProduction,
  productionSourceMap,
  prefix,
  suffix,
  autoCopy,
  externals,
  package,
} = require("./Constants")

const cssLoader = [
  "style-loader",
  "css-loader",
].filter(Boolean)

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer
    ]
  }
}

const sassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: !isProduction
  }
}

const cssModuleLoader = {
  loader: "typings-for-css-modules-loader",
  options: {
    modules: true,
    namedExport: true,
    camelCase: true,
    sass: true,
    minimize: true,
    localIdentName: "[local]_[hash:base64:5]"
  }
}

const mode = (isProduction && !productionSourceMap)
  ? "production"
  : "development"

const devtool = isProduction
  ? false
  : "inline-cheap-module-source-map"

console.log(`------------------
mode: ${mode}
devtool: ${devtool}
------------------`)

module.exports = {
  mode,
  devtool,
  entry: {
    index: path.resolve(Paths.Src, "index.tsx"),
  },
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@Src": Paths.Src,
      "@Comps": Paths.Comps,
      "@Utils": Paths.Utils,
      "@ant-design/icons/lib/dist$": path.resolve(Paths.Src, "assets/icons/.antd-icons"),
    }
  },
  module: {
    rules: [
      {
        test: /\.antd-icons$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            }
          },
          // 这是一个我自用的antd图标按需加载插件
          // 配合alias将@ant-design/icons/lib/dist$重定向到我们自定义的.antd-icons文件中
          // 该文件实质上是一个json文件， 所需的antd图标需要手动在该文件中列出来
          // 详见 https://github.com/xiaomingTang/antd-icons-loader
          "antd-icons-loader",
        ]
      },
      {
        test: /\.[jt]sx?$/,
        include: [ Paths.Src ],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryDirectory: "es",
                  libraryName: "antd",
                  style: "css"
                })]
              }),
              compilerOptions: {
                module: "es2015"
              }
            },
          },
          isProduction ? "eslint-loader" : null
        ].filter(Boolean),
      },
      {
        test: /\.css$/,
        // 如果 node_modules 中的文件需要经过压缩/css-loader等处理的, 必须在该 include 中添加路径
        include: [Paths.Src, path.resolve(Paths.Root, "node_modules/antd")],
        exclude: /\.min\.css$/,
        use: cssLoader,
      },
      {
        test: /\.s(a|c)ss$/,
        include: Paths.Src,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          ...cssLoader,
          isProduction ? postcssLoader : null,
          sassLoader,
        ].filter(Boolean),
      },
      {
        test: /\.module\.s(a|c)ss$/,
        include: Paths.Src,
        use: [
          "style-loader",
          cssModuleLoader,
          postcssLoader,
          sassLoader,
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)(\?.*)?$/i,
        include: Paths.Src,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/images/[name].[hash:6].[ext]"
          }
        }]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)(\?.*)?$/i,
        include: Paths.Src,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/fonts/[name].[hash:6].[ext]"
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        include: Paths.Src,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/medias/[name].[hash:8].[ext]' // 文件名
        }
      },
    ],
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
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
    isProduction ? new CopyPlugin({
      prefix,
      suffix,
      copy: autoCopy,
    }) : null,
  ].filter(Boolean),
}
