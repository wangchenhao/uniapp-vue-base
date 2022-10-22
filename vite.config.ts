import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import router from './scripts/vite-plugins/router'
import autoImport from 'unplugin-auto-import/vite'
import eslint from 'vite-plugin-eslint'
import WindiCSS from 'vite-plugin-windicss'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'
import VueI18nPlugin from '@intlify/vite-plugin-vue-i18n'
import svg from './scripts/vite-plugins/svg-icon'
import autoImportLibs from './auto-import'
import component from './scripts/vite-plugins/component'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        __APP_BUILD_TIME__: Date.now()
    },
    server: { host: '0.0.0.0', port: 8080 },
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        uni(),
        eslint({
            fix: true,
            include: ['src/**/*.{vue,ts,tsx}']
        }),
        svg({
            dir: 'src/assets/icons',
            dts: 'typings/icons.d.ts'
        }),
        WindiCSS(),
        MiniProgramTailwind(),
        VueI18nPlugin({
            include: resolve(__dirname, 'locales/**')
        }),
        router({
            dts: 'typings/router.d.ts'
        }),
        component({
            dts: 'typings/component.d.ts'
        }),
        autoImport({
            dts: 'typings/auto-imports.d.ts',
            include: [/\.tsx?$/, /\.vue\??/],
            imports: autoImportLibs
        })
    ]
})
