import { ToastType } from '@/shared/types'
import { defineStore } from 'pinia'

/**
 * State数据结构
 */
interface State {
    /**
     * 系统准备状态
     */
    ready: boolean
    keyboard: AppKeyboard
    message: AppMessage
    systemInfo: AppSystemInfo
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
    ready: false,
    keyboard: {
        visiable: false,
        height: 0
    },
    message: {
        visiable: 0,
        type: 'info'
    },
    systemInfo: {
        pixelRatio: 2,
        screenWidth: 0,
        screenHeight: 0,
        windowWidth: 0,
        windowHeight: 0
    }
})

export const store = defineStore('app', {
    state: createState,
    actions: {
        /**
         * 更新系统准备状态
         */
        updateReady() {
            this.ready = true
        },
        /**
         * 更新键盘显示状态
         */
        updateKeyboard(keyboard: AppKeyboard) {
            this.keyboard = keyboard
        },
        /**
         * 更新系统信息
         * @param systemInfo
         */
        updateSystemInfo(systemInfo: AppSystemInfo) {
            this.systemInfo = systemInfo
        }
    }
})

/**
 * 键盘显示状态
 */
interface AppKeyboard {
    visiable: boolean
    height: number
}

/**
 * 应用消息状态
 */
interface AppMessage {
    visiable: number
    type: ToastType
}

interface AppSystemInfo {
    platform?: string
    screenWidth: number
    screenHeight: number
    windowWidth: number
    windowHeight: number
    pixelRatio: number
    safeAreaInsets?: UniApp.SafeAreaInsets
}
