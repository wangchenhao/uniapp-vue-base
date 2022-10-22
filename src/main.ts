import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'
import VConsole from 'vconsole'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import uView from 'vk-uview-ui'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import App from './App.vue'

const i18n = createI18n({
    locale: uni.getLocale(),
    messages
})

export const createApp = () => ({
    app: createSSRApp(App).use(createPinia()).use(i18n).use(uView)
})

if (import.meta.env.MODE !== 'production') {
    new VConsole()
}
