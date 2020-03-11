'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/spider', controller.spider.index);
  // router.post('/api/:apiName/:methodName', controller.api.index);
  router.get('/api/save', controller.api.index);
  router.get('/api/getDMList', controller.api.index);
};
