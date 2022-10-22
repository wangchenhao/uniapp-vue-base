import fs from 'fs'
import path from 'path'
import type { ResolvedConfig, Plugin } from 'vite'
import { optimize, OptimizedSvg } from 'svgo'

// 虚拟模块ID
const MODULE_ID = 'virtual:icons'

// 服务列表
const icons: { [key: string]: string } = {}
// vite配置项
let viteConfig: ResolvedConfig

type Option = {
    dir: string
    dts: string
}

export default (option: Option): Plugin => {
    return {
        name: 'vite-plugin-svg-icon',
        enforce: 'pre',
        resolveId(id: string) {
            if (id === MODULE_ID) {
                return MODULE_ID
            }
        },
        configResolved(config) {
            viteConfig = config
        },
        load(id: string) {
            if (id !== MODULE_ID) return

            loadIcons(option.dir)

            generateDeclaration(option.dts)

            return generateCode()
        }
    }
}

/**
 * 加载图标数据
 * @param dir
 */
function loadIcons(dir: string) {
    const files = fs.readdirSync(path.resolve(dir))

    files.forEach(file => {
        if (!file.endsWith('.svg')) return

        const filepath = path.resolve(path.join(dir, file))

        const svg = fs.readFileSync(path.resolve(path.join(dir, file)), {
            encoding: 'utf-8'
        })

        //  压缩svg
        const { data } = optimize(svg, {
            plugins: ['preset-default'],
            path: filepath
        }) as OptimizedSvg

        icons[file.replace(/\.svg$/, '')] = Buffer.from(data).toString('base64')
    })
}

/**
 * 生成定义文件
 */
function generateDeclaration(dts: string) {
    const declaration = `declare module '${MODULE_ID}' {
  const iconNames = [
    ${Object.keys(icons)
        .map(x => `'${x}'`)
        .join(',\n    ')}] as const

  export const icons: Record<typeof iconNames[number], string>
}
`

    fs.writeFileSync(path.resolve(dts), declaration, 'utf-8')
}

function generateCode() {
    return `export const icons = ${JSON.stringify(icons)}`
}
