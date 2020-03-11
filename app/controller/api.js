'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    async index() {
        console.log(12312312)
        const { ctx } = this;
        console.log(JSON.stringify(ctx.params));
    }
}

module.exports = ApiController;
