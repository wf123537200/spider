# CHANGELOG

## 1.0.0

- 全量使用SVG ICON
- `npm run dev` 启动开发
- `npm run build` 打包
- `npm run analyze` 进行打包分析
- `npm run build:dll` 建立webpack动态链接库

## 1.1.0

- `eslint parser` 变更: from `"babel-eslint"` to `"@typescript-eslint/parser"`, 解决某些 ts 语法无法被识别的问题, 同时增强 ts 校验规范

## 2.0.0

- 拆分开发和生产环境的eslint配置，开发环境下采用宽松模式
- 新增命令 `npm run eslint:fix` 自动根据生产环境配置修复代码规范
- 移除 `@hot-reload/react-dom`(影响热重载)，新增 `react-dom`，修复页面热重载问题
- xhr模块支持动态路径参数(类似动态路由 `path/:id` )与更多axios参数配置
- 新增antd图标配置，可以按需引入，用于缩减antd-icon的体积
- 新增pre-commit
- 移除对 `sass` 的支持，默认只使用 `less`
- 新增webpack构建失败的错误抛出
- 移除classnames模块

## 2.0.1

- 精简antd与intl生成的语言包chunks，路由打包打上webpackChunkName
- 提供 cssModules demo
- Add question.md 记录问题与踩坑
- Fixed #8 "no-unused-vars" works incorrectly with spread syntax.

## 2.0.2

- bugfix 优化xhr模块URL路径参数的处理，修复contentType参数没有透传的问题
- bugfix 修复antd使用按需加载后，自定义主题色失效的问题
- webpack与mock的一些优化，以react-dev-utils为主要工具
- 基础组件修改，框架尽可能少的编写自定义样式，Menu、Layout优化，提供更自由的配置方式
- Fixed #7 升级 antd 最低要求 3.21.0，加载语言包的路径指向 antd/es/locale/xxx 这是升级后才有的，因为原有路径将在后续antd开始废除
- Fixed #12 切换语言时，页面内的组件被重新挂载 bug
- Fixed #10 querystring的语言参数设置优化，以此换取性能提升及对react-router Prompt的影响
