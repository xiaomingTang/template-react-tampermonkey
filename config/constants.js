const { Json } = require("tang-base-node-utils")

const packageJson = new Json(__dirname, "../package.json").readSync()

/**
 * src 中用到的 tampermonkey 内置函数, 均需要在 prefix 中声明 @grant
 * 
 * externals 中用到的包, 应当
 * 1. 在 prefix 中声明 @require
 * 2. 执行 yarn add *** --dev 将之作为 devDependencies, 以便在 development 环境下运行
 */
const prefix = `
// ==UserScript==
// @timestamp    ${Date.now()/* 这个参数用来确定你确实成功更新了脚本 */}
// @name         ${packageJson.name || "tamperscript name"}
// @author       ${packageJson.author || "tamperscript author"}
// @version      ${packageJson.version || "1.0.0"}
// @description  ${packageJson.description || "tamperscript description"}
// @namespace    http://tampermonkey.net/

// @match        https://www.baidu.com/*

// @require      https://cdn.bootcdn.net/ajax/libs/react/16.14.0/umd/react.production.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/react-dom/16.14.0/umd/react-dom.production.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/material-ui/4.11.2/umd/material-ui.production.min.js

// ==/UserScript==
`

const externals = {
  "react" : "React",
  "react-dom" : "ReactDOM",
  "@material-ui/core": "MaterialUI",
}

// -----------------------------------
// 以上即为自定义区
// -----------------------------------

module.exports = {
  now: Date.now(),
  isProduction: process.env.NODE_ENV !== "development",
  prefix,
  suffix: "\n",
  externals,
  package: packageJson,
}
