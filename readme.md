# template-react-tampermonkey

### description
让油猴也能用上**typescript**+**react**

### start
```
# cmd
git clone git@github.com:xiaomingTang/template-react-tampermonkey.git
```

### usage
- **yarn start**: 经由**WebpackDevServer**+**HotModuleReplacementPlugin**, 尽享更畅快的开发
- **yarn run build**: 构建到**dist**目录, 且内容自动复制到剪贴板, 之后手动拷贝到油猴输入框即可
- **yarn run bundle**: 调用Webpack Bundle Analyzer分析打包情况(虽然没必要...)

### 项目特点
- 由[template-ts-browser](https://github.com/xiaomingTang/template-ts-browser)模板生成
- 自动添加油猴脚本描述(详见**config/Constants.js**)
- 自动复制到剪贴板
- [x] eslint
- [x] typescript
- [x] 油猴内置函数的类型支持(详见**config/Constants.js**)
- [x] webpack externals 支持(详见**config/Constants.js**)
- [x] react
- [x] antd及按需加载
