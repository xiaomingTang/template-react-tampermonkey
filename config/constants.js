const { Json } = require("tang-base-node-utils")

const packageJson = new Json(__dirname, "../package.json").readSync()

// -----------------------------------
// 以下为自定义区, 如需修改请注意注释项
// -----------------------------------

/**
 * 一. src 中用到的 tampermonkey 内置函数, 均需要在 prefix 中声明 @grant
 *
 * 二. externals 中用到的包, 应当
 *   1. 在 prefix 中声明 @require
 *   2. 下面的 const externals 中声明
 *   3. 执行 yarn add -D *** 将之作为 devDependencies, 以便在 development 环境下运行
 */
const prefix = `
// ==UserScript==
// @timestamp    ${Date.now()/* 这个参数类似于版本号, 你可以注意该参数, 以证明你确实更新了该脚本 */}
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

/**
 * externals 中用到的包, 应当在此处声明
 */
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
