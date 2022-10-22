import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { useStorage } from '.'

/**
 * State数据结构
 */
interface State {
    text?: Ref<Text>
}

/**
 * State初始数据
 * @returns
 */
const createState = (): State => ({
    text: useStorage('edit.text', { placeholder: '', content: '' })
})

export const store = defineStore('user', {
    state: createState,
    actions: {
        updateText(value: string) {}
    }
})

interface Text {
    placeholder: string
    content: string
}
