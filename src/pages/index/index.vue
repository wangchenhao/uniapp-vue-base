<template lang="pug">
view.h-full.w-full
    view.header
        view.logo
            u-icon(name='photo')
        text 身份认证
    view.content
        uni-forms(:modelValue='formData' ref='form')
            uni-forms-item(label='姓名' name='name')
                uni-easyinput(
                    placeholder='请输入姓名'
                    type='text'
                    v-model='formData.name'
                )
            uni-forms-item(label='姓名' name='name')
                uni-easyinput(
                    placeholder='请输入姓名'
                    type='text'
                    v-model='formData.name'
                )
            uni-forms-item(label='姓名' name='name')
                uni-easyinput(
                    placeholder='请输入姓名'
                    type='text'
                    v-model='formData.name'
                )
</template>

<script setup lang="ts">
const formData = ref({})
</script>

<style scoped>
.header {
    margin: 54px auto;
}
.logo {
    background: url();
}
</style>
