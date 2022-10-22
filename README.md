# uniapp-vue-base

用uniapp开发小程序基础项目。
集成 pug模板开发 uni-ui vk-uview-ui eslint 等功能

### 目录结构
```
├── LICENSE
├── README.md
├── auto-import.ts vite 插件配置
├── index.html    入口文件模板html
├── locales       国际化
├── package.json  nodejs依赖
├── scripts       项目依赖脚本
│   ├── uni-upgrade
│   │   └── index.js
│   └── vite-plugins
│       ├── component.ts
│       ├── router.ts
│       └── svg-icon.ts
├── src
│   ├── main.ts         起始文件
│   ├── App.vue         起始组件
│   ├── pages.json      uni 页面配置
│   ├── manifest.json   uni 配置文件
│   ├── uni.scss        uni 默认样式文件
│   ├── assets          资源文件
│   │   ├── images
│   │   ├── styles
│   │   └── svg
│   ├── bootstrap       项目启动操作目录
│   │   ├── index.ts
│   │   ├── launch
│   │   │   ├── app.launch.ts
│   │   │   ├── index.ts
│   │   │   └── user.launch.ts
│   │   └── setup
│   │       ├── http.setup.ts
│   │       ├── index.ts
│   │       ├── lib.setup.ts
│   │       └── log.setup.ts
│   ├── config          项目公共配置文件目录
│   │   └── event.config.ts
│   ├── pages           项目页面开发
│   │   └── index
│   │       └── index.vue
│   ├── router          路由(不需要更改)
│   │   └── index.ts
│   ├── shared          工具文件夹
│   │   ├── common
│   │   │   └── index.ts
│   │   ├── components
│   │   │   └── svg-icon.vue
│   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── use-instance.ts
│   │   │   ├── use-logger.ts
│   │   │   └── use-login.ts
│   │   └── utils
│   │       └── logger.service.ts
│   ├── static          uni静态文件夹
│   │   └── logo.png
│   └── store
│       ├── app.store.ts
│       ├── index.ts
│       ├── router.store.ts
│       └── user.store.ts
├── tsconfig.json      typescript配置文件
├── typings            typescript类型声明
│   ├── auto-imports.d.ts
│   ├── component.d.ts
│   ├── env.d.ts
│   ├── global.d.ts
│   └── router.d.ts
├── vite.config.ts     vite配置文件
├── windi.config.ts    windicss配置文件
└── yarn.lock
```
