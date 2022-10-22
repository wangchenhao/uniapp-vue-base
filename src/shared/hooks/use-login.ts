import { events } from '@/config/event.config'

export const useLogin = () => {
    const showLogin = () => {
        const [page] = getCurrentPages().reverse()

        const path = `/${
            page['$page'].route || page['$page'].fullPath
        }`.replace(/^\/\//g, '/')

        const showEvent = `${path}:${events.login.show}`
        const resultEvent = `${path}:${events.login.result}`

        uni.$emit(showEvent)

        return new Promise<boolean>((resolve, reject) => {
            uni.$once(resultEvent, result => {
                if (result === true) {
                    resolve(true)
                } else {
                    reject(result)
                }
            })
        })
    }

    return {
        show: showLogin
    }
}
