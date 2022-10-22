import dayjs from 'dayjs'

export enum LogType {
    info = 1,
    warn = 2,
    error = 3
}

export interface LogConfig {
    logLevel?: number
    storageLevel?: number
}

const LoggerMapper = {
    [LogType.info]: {
        name: '调试',
        styles: {
            type: 'color:#17cf67;',
            date: 'color:#51a8ff;'
        }
    },
    [LogType.warn]: {
        name: '警告',
        styles: {
            type: 'color:#FFAC1D;',
            date: 'color:#51a8ff;'
        }
    },
    [LogType.error]: {
        name: '错误',
        styles: {
            type: 'color:#e51579;',
            date: 'color:#51a8ff;'
        }
    }
}

const LOG_STORAGE_KEY = '__LOG__'

/**
 * 日志操作装饰器
 * @param level
 * @returns
 */
function LogProvider(level: LogType) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.value = (...messages: string[]) => {
            // 打印日志
            if (level >= LoggerService.logLevel) {
                LoggerService.printLoggor(level, messages)
            }

            // 存储日志
            if (
                LoggerService.storageLevel &&
                level >= LoggerService.storageLevel
            ) {
                LoggerService.storageLoggor(level, messages)
            }
        }
    }
}

export class LoggerService {
    public static logLevel: LogType
    public static storageLevel?: LogType
    private static systemInfo

    /**
     *
     * @param param0 配置日志级别
     */
    public static setup({ logLevel, storageLevel }: LogConfig) {
        this.logLevel = logLevel || LogType.warn
        this.storageLevel = storageLevel

        LoggerService.getSystemInfo()
    }

    /**
     * 获取系统信息
     */
    private static getSystemInfo() {
        LoggerService.systemInfo = uni.getSystemInfoSync()
    }

    @LogProvider(LogType.info)
    public info(...message: any[]) {}

    @LogProvider(LogType.warn)
    public warn(...message: any[]) {}

    @LogProvider(LogType.error)
    public error(...message: any[]) {}

    /**
     * 写入日志
     * @param logLevel
     * @param message
     */
    public static printLoggor(level, message) {
        const logger = LoggerMapper[level]

        // 获取日志状态数据
        const record = LoggerService.formatLogger(logger)

        // 打印日志

        console.log(
            // APP下不输出样式
            // #ifndef APP-PLUS
            `%c[${record.type}] %c${record.date} ->`,
            logger.styles.type,
            logger.styles.date,
            // #endif
            ...message
        )

        // Error状态打印堆栈信息
        if (level === LogType.error) {
            const errorStack = Error().stack?.split('\n')
            errorStack?.splice(1, 2)

            console.log(errorStack?.join('\n'))
        }
    }

    /**
     * 存储日志
     * @param logLevel
     * @param message
     */
    public static storageLoggor(level, message) {
        // 获取日志状态数据
        const logger = LoggerMapper[level]
        const record = LoggerService.formatLogger(logger)

        // 获取存储组
        const storgetKey = `${LOG_STORAGE_KEY}${dayjs().format('YYYY-MM-DD')}__`

        // 获取日志Storage
        const storage = uni.getStorageSync(storgetKey) || []
        // 更新日志Storage
        storage.push(Object.assign(record, { message }))
        uni.setStorageSync(storgetKey, storage)
    }

    /**
     * 获取日志相关信息
     * @param logger
     * @returns
     */
    private static formatLogger(logger) {
        // 获取日志函数
        const store = useStore(store => store.user)

        return {
            type: logger.name,
            date: dayjs().format('YYYY-MM-DD HH:MM:ss'),
            user: store.current,
            systemInfo: LoggerService.systemInfo
        }
    }

    /**
     * 服务端同步日志
     */
    public syncStorage() {
        // TODO:日志同步
    }
}
