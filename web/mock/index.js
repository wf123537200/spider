const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const apiPrefix = '/mockapi';
const mock = {};

const mockDir = path.resolve(process.cwd(), 'mock');

fs
  .readdirSync(mockDir)
  .forEach((filename) => {
    if (filename === 'index.js' || !/^\S+\.js/.test(filename)) return;
    const config = require(`./${filename}`);
    const url = `${apiPrefix}${config.url}`;

    console.log(`${
      chalk.blueBright('[MOCK]')
    } ${url}: ${
      filename
    }`);

    Object.assign(mock, {
      [url]: {
        resultCode: '0',
        resultData: config.data,
        message: `get ${filename} success.`
      }
    });
  });

module.exports = mock;
