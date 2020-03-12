/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583724895222_8287';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.onClientError = async (err, socket, app) => {
    return {
      body: 'error',
      status: 400,
      headers: {
        'powered-by': 'Egg.js',
      }
    };
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // close csrf
  config.security = {
    csrf: {
      enable: false
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
