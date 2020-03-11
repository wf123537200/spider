'use strict';

const Service = require('egg').Service;


class QueryWeb extends Service {
    async query(url, params) {
        const result = await this.ctx.curl(url, Object.assign({timeout: 30000}, params));
        return result.data;
    }

    async queryWithAnalysis(url, params) {
        const result = await this.ctx.curl(url, Object.assign({timeout: 30000}, params));
        const {ctx} = this;
        const res = await ctx.service.analysis.main(result.data, url);
        return res;
    }
}

module.exports = QueryWeb;
