'use strict';

const Service = require('egg').Service;

class User extends Service {
    async setRootDir(params) {
        const {ctx, app} = this
        ctx.service.files.savefile({
            context: `{"rootDir":"${params.rootDir}"}`,
            fileName: `default`,
            dirName: `default`
        })
        // 保存到app全局变量里
        app.userInfo.rootDir = params.rootDir;
        return {}
    }

    async getUserInfo() {
        const {ctx, app} = this
        try {
            let res = await ctx.service.files.readFile({
                fileName: `default.json`,
                dirName: `default`,
            })
            return JSON.parse(res)
        } catch (e) {
            return {
                rootDir: 'saveRoot'
            };
        }
    }
}

module.exports = User;
