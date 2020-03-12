'use strict';

module.exports = (option, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      app.emit('error', err, this);
      const status = err.status || 500;
      const msg = status === 500 && app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;
      ctx.body = {
        code: 500,
        errType: 'NODE_ERR',
        msg,
        data: null
      };
    }
  };
};
