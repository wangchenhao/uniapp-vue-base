type Constructor<T> = new (...args: any[]) => T

export function useInstance<T>(InstanceClass: Constructor<T>, params?: any): T {
    // TODO: 是否做依赖注入采集
    const instance = new InstanceClass(params)

    return instance
}
