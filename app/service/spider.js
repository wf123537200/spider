'use strict';

const Service = require('egg').Service;

class Spider extends Service {
  async runSpider({targetUrl}) {
    if (!targetUrl) throw new Error('can not query without url param！');

    const { ctx } = this;
    return await ctx.service.queryWeb.queryWithAnalysis(targetUrl)
  }
}

module.exports = Spider;
