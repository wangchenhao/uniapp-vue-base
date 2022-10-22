import type { ImportsMap, PresetName } from 'unplugin-auto-import/dist/types'

const imports: Array<ImportsMap | PresetName> = [
    'vue',
    {
        '@/router': ['useRouter'],
        '@/store': ['useStore'],
        '@/shared/common': ['get', 'set'],
        '@/shared/hooks': [
            'useInstance',
            'useLogger',
            'useToast',
            'useMedia',
            'useUploader'
        ],
        '@/shared/lifecycle': ['onPageLoad']
    }
]

export default imports
