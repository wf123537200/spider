'use strict';

const Controller = require('egg').Controller;

class UserSetController extends Controller {
    async index() {
        const { ctx } = this;
        // const url = 'http://m.3had.com/shaonv/2016/0513/652_37.html';
        const url = 'http://m.3had.com/shaonv/2020/0117/6846.html';
        const spiderStart = await ctx.service.spider.goSpider({url});
        ctx.body = spiderStart + '';
    }
}

module.exports = UserSetController;
