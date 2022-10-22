<script lang="ts">
import bootstrap from './bootstrap'
import { useLogger } from './shared/hooks'

const logger = useLogger()

export default {
    onLaunch: () => {
        // 系统初始化
        bootstrap()
    },
    onShow: () => {
        logger.info('App Show')
    },
    onHide: () => {
        logger.info('App Hide')
    }
}
</script>

<style lang="scss">
@import 'vk-uview-ui/index.scss';
@import '@/assets/styles/default.scss';
@import '@/assets/styles/common.scss';
@import '@/assets/styles/theme.scss';
</style>
