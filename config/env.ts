import { isProduction } from "./constants"

/**
 * key and value 必须全部为 string, 不得为 number 或其他类型
 */
export interface EnvConfig {
  [key: string]: string;
}

/**
 * 所有使用该项目的, 应当在该文件所在目录下新建 env.local.ts 文件, 用于导出环境配置
 * 
 * 如果有自定义项, 自己添加自定义项
 * 
 * 如果没有, 就将下面这个对象原样导出
 * 
 * ```
 * import { envConfig, EnvConfig } from "./env"
 * 
 * export const localEnvConfig: EnvConfig = {
 *   ...envConfig,
 *   CUSTOM_VAR: "custom value",
 * }
 * ```
 */
export const envConfig: EnvConfig = {
  DEV_ROOT_ELEM_SELECTOR: "#__tampermonkey__app",
}
