# Some Questions

## "style-loader": "^0.23.1"
在使用 cssModules 时，less 文件新增一个类，会出现错误

```
process-update.js:32 Error: Aborting CSS HMR due to changed css-modules locals.
    at style.less?feff:39
    at Object.hotApply [as apply] (bootstrap:684)
    at cb (process-update.js:76)
    at process-update.js:91
```

Links: <https://github.com/webpack-contrib/style-loader/issues/320>
或者降级 style-loader@0.19.1