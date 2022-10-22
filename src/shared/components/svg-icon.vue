<template lang="pug">
.svg-icon(:class='containerClass' @click='() => emits("click")')
    image.icon(:src='iconData' :style='imageStyle' mode='widthFix')
    text.text(:style='textStyle' v-if='text') {{ text }}
</template>

<script setup lang="ts">
import { icons } from 'virtual:icons'
import { encode, decode } from 'js-base64'

const emits = defineEmits<{
    (e: 'click'): void
}>()

interface Props {
    name: keyof typeof icons
    size?: number | string
    text?: string
    textSize?: number | string
    textColor?: string
    textGap?: number
    textPosition?: 'right' | 'bottom'
    color?: string
}

const changeIconColor = icon => {
    if (!props.color) return icon

    return encode(
        decode(icon).replace(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g, props.color)
    )
}

const iconData = computed(() => {
    const icon = changeIconColor(icons[props.name])

    return `data:image/svg+xml;base64,${icon}`
})

const props = withDefaults(defineProps<Props>(), {
    size: 50,
    textSize: 30,
    textColor: '#000',
    textPosition: 'right',
    textGap: 2
})

const iconSize = computed(() => {
    if (typeof props.size === 'number') {
        return `${uni.upx2px(props.size)}px`
    }

    if (props.size.endsWith('rpx')) {
        return `${uni.upx2px(parseInt(props.size.replace('rpx', '')))}px`
    }

    if (props.size.endsWith('px') || props.size.endsWith('rem')) {
        return props.size
    }

    return `${uni.upx2px(parseInt(props.size))}px`
})

const imageStyle = computed(() =>
    Object.assign(
        {
            width: get(iconSize),
            height: get(iconSize)
        },
        props.color ? { color: props.color } : {}
    )
)

const textStyle = computed(() => ({
    'font-size': `${uni.upx2px(parseInt(props.textSize.toString()))}px`,
    color: props.textColor
}))

const containerClass = computed(() => ({
    flex: true,
    'flex-row': props.textPosition === 'right',
    'flex-col': props.textPosition === 'bottom',
    'justify-center': true,
    'items-center': true,
    [`flex-gap-${props.textGap}`]: true
}))
</script>

<style lang="scss" scoped>
.icon {
    display: block;
}
</style>
