# react-seed3-ts

Fork [react-seed3](https://git.code.oa.com/fd-base-js/react-seed3) 并改用 `typescript` 的版本，[查看更多日志](./CHANGELOG.md)

## 项目结构

- components: 纯函数组件，所需要的文字描述或其他内容都从外部传入，本身只形成 html 与样式。
* containers: 公共模块组件（存在connect），例如修改密码对话框等，可被多个页面引入使用，可使用state，model等，不占用路由。若存在多语言处理，需使用HOC:

```
import { IntlProvider } from 'react-intl';
<IntlProvider messages={require('./locales/${xxx}')}>
    {children}
</IntlProvider
```

- pages: 页面，每一个单独的页面可能包含入口 index, 样式 style.less, 语言包 locales/等，每一个页面使用的路由在 `src/config/routes` 中进行配置。

```
.
├── build 打包与开发模式配置
├── dist 打包输出目录
├── mock
├── src
│   ├── components
│   ├── config
│   │   ├── api 接口配置，模块化管理
│   │   └── ...
│   ├── containers
│   ├── models
│   ├── pages
│   ├── public
│   ├── themes
│   └── utils 工具库
└── webpack 开发缓存相关，例如 webpack.dll
```

## pre-commit 和 eslint/tslint

- 执行 commit 时，会触发 hooks，调用 eslint 检测
- 如果出现报错，请确保你的代码规范后再次提交
- 如果出现大量规范错误，可以使用 npm run eslint:fix 进行自动修复

```js
// 手动检测
npm run eslint

// 手动修复
npm run eslint:fix
```

## 关于 antd-icon 包体积优化

如果发现 icon 的包体积过大，**一般情况下内网我们无需关注**，但是如果项目上云则可以通过以下方式进行优化

1. 开启 webpack.config 中的以下代码

```js
const alias = {
  src: SRC_DIR

  // 【用来缩减antd-icon的体积，可以配合themes/antd.icons.js来使用，按自己的需要放置图标】
  // '@ant-design/icons/lib/dist$': resolvePath('src/themes/antd.icons.js')
};
```

2. 手动查找你需要的 icon（注意 icon 的路径，有的是 outline 有的是 fill）

```js
// 将图标放置在此文件夹下
src / theme / antd.icons.js;
```

## How To Use Css Modules

- 需要使用 styles.className（css module）的方式引入样式时，引入方式改为：（由于修改了 css module 的规则）

  ```js
  import styles from "./index.scss?local";
  ```

## 一些问题

```
warnAboutDeprecatedCJSRequire.js:17 Warning: Please use `require("history").createHashHistory` instead of `require("history/createHashHistory")`. Support for the latter will be removed in the next major release.

dva问题，不影响正常使用，等待dva版本升级可解决warning
```
