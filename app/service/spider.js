'use strict';

const Service = require('egg').Service;

class Spider extends Service {
  async goSpider({url, needAnalysis = true}) {
    if (!url) throw new Error('can not query without url param！');

    const { ctx } = this;
    const webHtml = needAnalysis ? await ctx.service.queryWeb.queryWithAnalysis(url) : await ctx.service.queryWeb.query(url);
    return webHtml;
  }
}

module.exports = Spider;
