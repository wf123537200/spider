'use strict';

const Service = require('egg').Service;

class Analysis extends Service {
    async main(body, addr, type = 'xiximh') {
        const {ctx} = this;
        if(!ctx.service[type]) throw new Error('can not analysis this type');
        return await ctx.service[type].analysis.main(body, addr)
    }
}

module.exports = Analysis;
