const { execSync } = require('child_process')
const package = require('../../package.json')

const UNIAPP_VERSION = package['uni-app'].version

console.info(`当前依赖版本为: ${UNIAPP_VERSION}`)

execSync(`npx uvm ${UNIAPP_VERSION} --manager=yarn`, {
    stdio: 'inherit'
})
