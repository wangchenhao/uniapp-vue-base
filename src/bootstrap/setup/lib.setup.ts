import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import zhCN from 'dayjs/locale/zh-cn'

function dayjsSetup() {
    dayjs.locale(zhCN)

    dayjs.extend(relativeTime)
}

export function libSetup() {
    dayjsSetup()
}
