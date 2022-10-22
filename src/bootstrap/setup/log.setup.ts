import { LoggerService, LogType } from '@/shared/utils/logger.service'

export function logSetup() {
    LoggerService.setup({
        logLevel: LogType.info,
        storageLevel: LogType.warn
    })
}
