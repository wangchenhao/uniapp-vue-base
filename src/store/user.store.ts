import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
interface State {
    /**
     * 当前用户信息
     */
    current?: User
    token: Ref<string>
    code: Ref<string>
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
    current: undefined,
    token: useStorage('user.token', ''),
    code: useStorage('user.key', '')
})

export const store = defineStore('user', {
    state: createState,
    actions: {
        updateCurrent(value: any) {
            this.current = value
        },
        updateToken(value: string) {
            this.token = value
        },
        updateCode(value: string) {
            this.code = value
        }
    }
})

interface User {
    // 用户数据结构
}
