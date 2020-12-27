// 用于规范 src 目录
const path = require("path")
const Paths = require("./config/Paths")

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": [
    "react-hooks",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "allowImportExportEverywhere": true,
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true,
    },
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: path.resolve(Paths.Config, "webpack.prod.config.js")
      }
    },
    "react": {
      "version": "detect",
    },
  },
  rules: {
    // window风格的换行(而非unix)
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "semi": ["error", "never"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  
    // 便于调试, 所以允许console
    "no-console": "off",
    // scss自动生成的scss.d.ts没有使用default, 同时一些utils可能从语义上来说没有default导出, 所以关闭
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "max-len": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-parameter-properties": "off",
  }
}
