import * as path from "path"

const appRoot = path.resolve(__dirname, "../")

function resolve(...p: string[]) {
  return path.resolve(appRoot, ...p)
}

const Paths = {
  Root: appRoot,
  Src: resolve("src"),
  Comps: resolve("src/components"),
  Public: resolve("public"),
  Dist: resolve("dist"),
  Config: resolve("config"),
  NodeModule: resolve("node_modules"),
  Pages: resolve("src/pages"),
  Utils: resolve("src/utils"),
  resolve,
}

export default Paths
