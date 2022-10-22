import fs from 'fs'
import path from 'path'
import hjson from 'hjson'
// 默认定义文件名

type Option = {
    dts: string
}

export default (option: Option) => {
    return {
        name: 'vite-plugin-request-declare',
        enforce: 'pre',
        buildStart() {
            const json = fs.readFileSync(path.resolve('src/pages.json'), {
                encoding: 'utf-8'
            })

            const { pages } = hjson.parse(json)

            generatePagesDeclaration(pages, option.dts)
        }
    }
}

/**
 * 生成定义文件
 */
function generatePagesDeclaration(pages, dts) {
    const declaration = `declare type RouterPages =
    ${pages.map(x => `| \'/${x.path}\'\n`).join('    ')}`

    fs.writeFileSync(path.resolve(dts), declaration, 'utf-8')
}
