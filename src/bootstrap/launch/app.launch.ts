import { useLogin } from '@/shared/hooks'
import { pages } from '@/pages.json'

/**
 * 检测App更新
 */
async function appUpdateCheck() {}

/**
 * 获取键盘信息
 */
async function appKeyboardListener() {
    const HeaderHight = 100
    const store = useStore(store => store.app)

    // #ifndef H5
    uni.onKeyboardHeightChange(({ height }) => {
        store.updateKeyboard({
            visiable: height !== 0,
            height
        })
    })
    // #endif

    // #ifdef H5
    uni.onWindowResize(({ size }) => {
        const { windowHeight, screenHeight } = size as any
        const visiable = screenHeight - windowHeight > HeaderHight
        store.updateKeyboard({
            visiable,
            height: 0
        })
    })
    // #endif
}

async function appSystemInfo() {
    const store = useStore(store => store.app)
    uni.getSystemInfo({
        success: function (res) {
            // uni.showToast({ title: JSON.stringify(res.safeArea) })
            store.updateSystemInfo({
                platform: res.platform,
                screenWidth: res.screenWidth,
                screenHeight: res.screenHeight,
                windowWidth: res.windowWidth,
                windowHeight: res.windowHeight,
                pixelRatio: res.pixelRatio,
                safeAreaInsets: res.safeAreaInsets
            })
        }
    })
}

/**
 * Tabbar跳转权限拦截
 */
async function tabbarInterceptor() {
    const onNeedLogin = (url: string) => {
        const login = useLogin()

        login.show().then(() => {
            uni.switchTab({ url })
        })
    }

    uni.addInterceptor('switchTab', {
        invoke: ({ url }) => {
            const store = useStore(store => store.user)

            const page = pages.find(
                page => page.path === url.replace(/^\//, '')
            )

            // switchTab页面授权判断
            if (
                url !== '/' &&
                page?.meta?.needLogin === true &&
                !store.current
            ) {
                onNeedLogin(url)
                return false
            } else {
                return true
            }
        }
    })
}

/**
 * 系统启动列表
 * @returns
 */
export default function appLaunch() {
    return [
        appUpdateCheck(),
        appSystemInfo(),
        appKeyboardListener(),
        tabbarInterceptor()
    ]
}
