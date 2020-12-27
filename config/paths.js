const path = require("path")

const appRoot = path.resolve(__dirname, "../")
const srcRoot = path.resolve(appRoot, "src")

const Paths = {
  Root: appRoot,
  Src: srcRoot,
  Comps: path.resolve(srcRoot, "components"),
  Public: path.resolve(appRoot, "public"),
  Dist: path.resolve(appRoot, "dist"),
  Config: path.resolve(appRoot, "config"),
  NodeModule: path.resolve(appRoot, "node_modules"),
  Pages: path.resolve(srcRoot, "pages"),
  Utils: path.resolve(srcRoot, "utils"),
}

module.exports = Paths
