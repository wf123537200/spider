const Express = require('express');
const webpack = require('webpack');
const openBrowser = require('react-dev-utils/openBrowser');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const proxy = require('http-proxy-middleware');
const wdm = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const chalk = require('chalk');

const compiler = webpack(webpackConfig);

const host = 'localhost';
const port = 8080; // 初始端口
const devServerOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  hotOnly: false,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  overlay: {
    errors: true,
    warnings: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001', // 注意是https还是http，否则后台会报错
      secure: false,
      changeOrigin: true,
    }
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: true,
    timings: true,
    version: false,
  },
  // writeToDisk: true,
};

const app = new Express();

// proxy 代理需要放在bodyParser前，避免请求的内容被篡改
if (devServerOptions.proxy) {
  Object
    .keys(devServerOptions.proxy)
    .forEach((context) => {
      app.use(proxy(context, devServerOptions.proxy[context]));
    });
}

const mock = require('../mock');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
for (const url in mock) {
  app.get(url, function (req, res, next) {
    res.send(mock[url]);
  });
}

// for 前端
app.use(require('connect-history-api-fallback')());
// 使用前端路由
const wdmInstance = wdm(
  compiler,
  devServerOptions,
);
app.use(wdmInstance); // 使用webpack.config.dev.js作为基础来配置webpack-dev-middleware
app.use(require('webpack-hot-middleware')(compiler));

// 寻找空闲端口来运行dev-server
module.exports = new Promise((resolve) => {
  choosePort(host, port)
    .then((newPort) => {
      if (port !== newPort) {
        console.log(`${port}端口被占用，开启新端口${newPort}`);
      }
      const server = app.listen(newPort, (err) => {
        if (err) {
          console.error(err);
        }

        // 等待compile
        wdmInstance.waitUntilValid(() => {
          // On Mac OS X, attempts to reuse an existing Chrome tab via AppleScript.
          // Otherwise, falls back to opn behavior.
          const url = `http://${host}:${newPort}`;
          openBrowser(url);
          console.log(`${chalk.black.bgGreen('DONE')} Server running at ${url}`);
        });
      });
      resolve({
        port: newPort,
        close: () => {
          server.close();
        },
      });
    })
    .catch((error) => {
      console.log('没有找到空闲端口，请打开任务管理器杀死进程端口再试', error);
    });
});
