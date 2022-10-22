import setup from './setup'
import launch from './launch'

export default async function () {
    // 基础功能配置
    await setup()
    // 系统启动
    await launch()
}
