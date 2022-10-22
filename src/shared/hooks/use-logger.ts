import { useInstance } from '.'
import { LoggerService } from '../utils/logger.service'

export const useLogger = () => useInstance(LoggerService)
