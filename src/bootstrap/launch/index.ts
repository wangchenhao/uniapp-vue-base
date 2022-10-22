import getAppLaunchTasks from './app.launch'
import getUserLaunchTasks from './user.launch'
/**
 * 业务启动逻辑
 */
async function appLaunch() {
    // 同步并获取应用
    await Promise.all(getAppLaunchTasks())
}

/**
 * 获取用户Token
 * @returns
 */
async function updateUserToken() {
    // TODO 读取用户Token
}

async function updateUserScopes() {
    // TODO 更新用户权限
}

/**
 * 获取用户信息
 * @returns
 */
async function updateCurrentUser() {
    const store = useStore(store => store.user)

    if (store.token) {
        // TODO: 获取用户数据
        return store.updateCurrent({})
    }
}

function requestAuth() {
    // TODO 校验用户
}

/**
 * 业务启动逻辑
 */
async function userLaunch() {
    const store = useStore(store => store.user)
    // 获取用户Token
    await updateUserToken()
    // TODO:更新用户信息
    await updateCurrentUser()
    // 更新用户权限范围
    await updateUserScopes()
    // 同步并获取应用
    if (store.current) {
        await Promise.all(getUserLaunchTasks())
    } else {
        requestAuth()
    }
}

/**
 * 系统初始化
 */
export default async function () {
    const store = useStore(store => store.app)
    // 检测系统启动状态
    if (store.ready) return

    // 系统启动逻辑
    await appLaunch()
    // 用户启动逻辑
    await userLaunch()

    // 系统初始化完成
    store.updateReady()
}
