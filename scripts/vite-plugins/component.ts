import fs from 'fs'
import path from 'path'
import hjson from 'hjson'

const PAGE_FILE_PATH = 'src/pages.json'

type Option = {
    dts: string
}

export default (option: Option) => {
    return {
        name: 'vite-plugin-component-declare',
        enforce: 'pre',
        buildStart() {
            const json = fs.readFileSync(path.resolve(PAGE_FILE_PATH), {
                encoding: 'utf-8'
            })

            const { easycom } = hjson.parse(json)

            generateComponentDeclaration(easycom, option.dts)
        }
    }
}

/**
 * 生成定义文件
 */
function generateComponentDeclaration(easycom, dts) {
    const { custom } = easycom

    if (!custom) return

    const components = Object.entries(custom as Record<string, string>)
        .map(([name, url]) => [name.replace('^', ''), url])
        .filter(([name, url]) => !name.startsWith('fui-'))

    const importCode = generateImport(components)
    const interfaceCode = generateInterface(components)

    const declaration = `${importCode}

declare module 'vue' {
    export interface GlobalComponents {
        ${interfaceCode}
    }
}
`
    fs.writeFileSync(path.resolve(dts), declaration, 'utf-8')
}

function generateImport(components) {
    return components
        .map(([key, url]) => `import ${key} from '${url}'`)
        .join('\n')
}

function generateInterface(components) {
    return components
        .map(([key, url]) => `${key}: typeof ${key}`)
        .join('\n        ')
}
