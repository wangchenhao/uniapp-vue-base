/// <reference types="vite-svg-loader" />

import '@vue/runtime-core'
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        getOpenerEventChannel: () => {
            on: (eventName: string, callback: (result: any) => void) => void
            once: (eventName: string, callback: (result: any) => void) => void
            emit: (eventName: string, param?: any) => void
            off: (eventName: string, callback?: (result: any) => void) => void
        }
        $page: any
    }
}
