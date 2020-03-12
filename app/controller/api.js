'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    async index() {
        const { ctx } = this;
        // 转发到不同的service api处理
        const {apiName, methodName} = ctx.params;
        let res = {}
        if(ctx.service[apiName] && ctx.service[apiName][methodName]) {
            console.log(`${apiName}.${methodName} ready 2 handler`)
            res = await ctx.service[apiName][methodName](ctx.request.body)
        }
        if(res.errorCode) {
            ctx.body = Object.assign({
                errorCode: 0,
                result: {},
                msg: 'error'
            }, {
                ...res
            })
        } else {
            ctx.body = {
                errorCode: 0,
                result: {
                    ...res
                },
                msg: 'ok'
            }
        }
    }
}

module.exports = ApiController;
