import { events } from '@/config/event.config'
import { encode, decode } from 'js-base64'
import { useLogin } from '@/shared/hooks'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import qs from 'qs'
import type { ComponentInternalInstance } from 'vue'
import { pages } from '../pages.json'

const logger = useLogger()
/**
 * 导航类型
 */
type navigateMode = 'push' | 'redirect' | 'relaunch'

/**
 * 路由导航配置
 */
interface navigateOptions {
    mode?: navigateMode
    query?: { [key: string]: any }
    params?: { [key: string]: any }
    events?: { [key: string]: (...params: any[]) => void }
}

/**
 * 默认导航配置
 */
const defaultNavigateMode: navigateMode = 'push'

class Router {
    private readonly _instance: ComponentInternalInstance | null
    private readonly _page
    private eventChannel

    private routerParams: any[] = []

    private get page() {
        return this._page['$page']
    }

    private get instance() {
        return this._instance
    }

    public getRouterParams() {
        return this.routerParams.pop() || {}
    }

    private query: { [key: string]: string | number }
    private params: { [key: string]: any }

    constructor(instance: ComponentInternalInstance | null, page: any) {
        this._instance = instance
        this._page = page

        this.onRouterInit()
    }

    private onRouterInit() {
        const setQuery = query => {
            this.query = this.decodeQuery(query)

            if (this.page) {
                this.page.query = this.query
            }
        }

        const setParams = () => {
            const [page, beforePage] = getCurrentPages().reverse()

            if (beforePage) {
                const params = routers.get(beforePage)?.getRouterParams()
                this.params = params || {}
            }
            // const eventChannel = this.getOpenerEventChannel()

            // if (eventChannel && eventChannel.once) {
            //     this.eventChannel = eventChannel
            //     eventChannel.once(events.router.params, params => {
            //         this.params = params
            //     })
            // }
        }

        onLoad(query => {
            setParams()
            setQuery(query)
        })
    }

    public getPath() {
        const { router, fullPath } = get(this.page) || {}

        return `/${(router || fullPath || '').replace(
            /^\//,
            ''
        )}` as RouterPages
    }

    public getOpenerEventChannel() {
        if (this.instance && this.instance.proxy) {
            return this.instance.proxy?.getOpenerEventChannel()
        }
    }

    /**
     * 验证页面权限
     * @param page
     * @returns
     */
    private validatePage(page) {
        const store = useStore(store => store.user)

        // 验证页面牧尘在需要登陆
        if (page?.meta?.needLogin !== true) return

        // 页面需要登陆
        return !!store.current
    }

    private onNeedLogin() {
        const login = useLogin()

        return login.show()
    }

    private decodeQuery(query) {
        return Object.entries(query).reduce(
            (result, [key, value]) => (
                (result[key] =
                    typeof value === 'string' && value.startsWith('__object__')
                        ? JSON.parse(
                              decode(value.replace(/^\_\_object\_\_/g, ''))
                          )
                        : value),
                result
            ),
            {}
        )
    }

    private encodeQuery(query) {
        return Object.entries(query).reduce(
            (result, [key, value]) => (
                (result[key] =
                    typeof value === 'object'
                        ? `__object__${encode(JSON.stringify(value))}`
                        : value),
                result
            ),
            {}
        )
    }

    /**
     * 路由导航
     * @param path
     * @param options
     * @returns
     */
    public async navigateTo(
        path: RouterPages,
        options: navigateOptions = {}
    ): Promise<any> {
        const mode = options.mode ?? defaultNavigateMode
        const page = pages.find(page => `/${page.path}` === path)

        if (!page) {
            logger.error(`页面不存在:${path}`)
            return Promise.reject()
        }

        if (this.validatePage(page) === false) {
            await this.onNeedLogin()
        }

        this.routerParams.push(options.params)

        // 获取路由行为
        const navigateAction = {
            push: uni.navigateTo,
            redirect: uni.redirectTo,
            relaunch: uni.reLaunch
        }[mode]

        const navigateUrl = `${path}${
            options.query
                ? qs.stringify(this.encodeQuery(options.query), {
                      addQueryPrefix: true,
                      encode: false
                  })
                : ''
        }`

        return new Promise(resolve => {
            // 获取路由参数
            const navigateOption = Object.assign(
                {
                    url: navigateUrl
                },
                mode === 'push'
                    ? {
                          events: {
                              ...(options.events || {}),

                              [events.router.back]: data => {
                                  resolve(data)
                              }
                          }
                      }
                    : {}
            )

            // 触发页面导航
            navigateAction({
                ...navigateOption
            })
        })
    }

    public back(option?: UniApp.NavigateBackOptions & { params? }) {
        const { params, ...backOption } = option || {}

        if (
            this.instance &&
            this.instance.proxy &&
            option &&
            params !== undefined
        ) {
            const { proxy } = this.instance

            const eventChannel = proxy.getOpenerEventChannel()

            eventChannel && eventChannel.emit(events.router.back, params)
        }

        uni.navigateBack(backOption)
    }

    /**
     * 获取页面参数
     * @returns
     */
    public getParams(key?: string) {
        if (this.params) {
            return key ? this.params[key] : this.params
        }
    }

    public getQuery(key?: string) {
        if (this.query) {
            return key ? this.query[key] : this.query
        }
    }
}

const routers = new WeakMap<any, Router>()

export const useRouter = () => {
    const instance = getCurrentInstance()
    const [page] = getCurrentPages().reverse()
    const cache = routers.get(page)

    if (cache) {
        return cache
    }

    onUnload(() => {
        routers.delete(page)
    })

    const router = new Router(instance, page)
    routers.set(page, router)
    // 处理页面传递数据

    // const router = {
    //     navigateTo: navigateTo(instance),
    //     back: navigateBack(instance),
    //     getParams: getPageParams(),
    //     getQuery: getPageQuery(),
    //     getPath: getPagePath,
    //     getOpenerEventChannel: () => getEventChannel(instance)
    // }
    return router
}
