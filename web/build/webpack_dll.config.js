const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const pkg = require('../package.json')

// utils
const ROOT_DIR = path.resolve(__dirname, '../')
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args)

module.exports = {

  entry: {
    dependencies: Object.keys(require('../package.json').dependencies),
    /* 可自定义 */
    // dependencies: ['react', 'react-dom']
  },

  output: {
    path: resolvePath('webpack/dist'), // 动态链接库输出路径
    filename: '[name].dll.js', // 动态链接库输出的文件名称
    libraryTarget: 'var', // 默认'var'形式赋给变量 b
    library: '_dll_[name]_[hash]', // 全局变量名称 导出库将被以var的形式赋给这个全局变量 通过这个变量获取到里面模块
  },

  resolve: {
    alias: {
    }
  },

  plugins: [
    // https://webpack.js.org/plugins/dll-plugin/
    new webpack.DllPlugin({
      path: resolvePath('webpack/dist', '[name].manifest.json'),
      name: '_dll_[name]_[hash]', // 和library 一致，输出的manifest.json中的name值
    }),
    // 清理文件
    new CleanWebpackPlugin('dist'),
  ],

}
