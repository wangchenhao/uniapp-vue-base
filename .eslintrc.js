module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    globals: {
        uni: 'readonly',
        plus: 'readonly',
        wx: 'readonly'
    },
    extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        quotes: [1, 'single'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': 1,
        'vue/multi-word-component-names': 0,
        '@typescript-eslint/no-unused-vars': 'off'
    }
}
