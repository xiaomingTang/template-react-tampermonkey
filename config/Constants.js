const { Json } = require("tang-base-node-utils")

const packageJson = new Json(__dirname, "../package.json").readSync()
const isProduction = process.env.NODE_ENV !== "development"

/**
 * src 中用到的 tampermonkey 内置函数, 均需要在 prefix 中声明 @grant
 * 
 * externals 中用到的包, 应当
 * 1. 在 prefix 中声明 @require
 * 2. 执行 yarn add *** --dev 将之作为 devDependencies, 以便在 development 环境下运行
 */
const prefix = `
// ==UserScript==
// @timestamp    ${new Date().getTime()/* 这个参数用来确定你确实成功更新了脚本 */}
// @name         ${packageJson.name || "tamperscript name"}
// @author       ${packageJson.author || "tamperscript author"}
// @version      ${packageJson.version || "1.0.0"}
// @description  ${packageJson.description || "tamperscript description"}
// @namespace    http://tampermonkey.net/

// @match        https://www.baidu.com/*

// @require      https://cdn.bootcss.com/react/16.10.2/umd/react.production.min.js
// @require      https://cdn.bootcss.com/react-dom/16.10.2/umd/react-dom.production.min.js

// ==/UserScript==
`

const externals = {
  "react" : "React",
  "react-dom" : "ReactDOM",
}

// -----------------------------------
// 以上即为自定义区
// -----------------------------------

module.exports = {
  isProduction,
  autoCopy: isProduction,
  /**
   * 生产环境下, 由于代码被油猴在外面封装了一层, 所以不能 sourceMap
   * 而这儿的 productionSourceMap 仅仅是开启 development 模式, 让代码可读性稍微好一些
   * 建议设为 false
   */
  productionSourceMap: false,
  prefix,
  suffix: "\n",
  externals,
  package: packageJson,
}
