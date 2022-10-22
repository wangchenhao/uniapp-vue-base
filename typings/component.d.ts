import u-(.*) from 'vk-uview-ui/components/u-$1/u-$1.vue'
import uni-(.*) from '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue'
import SvgIcon from '@/shared/components/svg-icon.vue'

declare module 'vue' {
    export interface GlobalComponents {
        u-(.*): typeof u-(.*)
        uni-(.*): typeof uni-(.*)
        SvgIcon: typeof SvgIcon
    }
}
