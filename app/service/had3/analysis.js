'use strict';

const Service = require('egg').Service;
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const path = require('path');
let errorList = [];
let totalLen = 0;
let completeNo = 0;
let retryCnt = 0;

class Analysis extends Service {
    async main(body, addr, isGetOne = false) {
        console.log('\x1B[32m%s\x1B[39m','----------being analysis-------')
        errorList = [];
        totalLen = 0;
        completeNo = 0;

        const b = iconv.decode(body, 'gbk')

        if(isGetOne) {
            await this.getOne(b);
        } else {
            await this.getAll(b, addr);
        }
        const saveDirName = this.getTitle(b);

        return {
            total: totalLen,
            addr: path.resolve(`./${this.app.userInfo.rootDir}/${saveDirName}`)
        };
    }

    async getAll(b, addr) {
        // 获取所有页面图片地址
        const $ = cheerio.load(b);
        const {ctx} = this;
        // 获取指定元素
        let item = $('#dedepagetitles').find('option');
        let urlPre = addr.split('/')
        urlPre.pop()
        let urlStr = urlPre.join('/');
        totalLen = item.length
        item.map(async (k, v) => {
            const url = urlStr + '/' + v.attribs.value
            try {
                const d = await ctx.service.queryWeb.query(url, {timeout: [1000, totalLen * 500 < 5000 ? 5000 :  totalLen * 500]})
                this.getOne(iconv.decode(d, 'gbk'))
            } catch (e) {
                this.errorList(url)
            }
        })
    }

    async getOne(b) {
        const {ctx} = this;
        const $ = cheerio.load(b);
        const $title = $('title');
        let title = $title[0].children[0].data.split(' ')[0];
        title = title.substr(0, title.indexOf('(') > 0 ? title.indexOf('(') : title.indexOf('_'));
        // 获取指定元素
        let item = $('#nr234img').find('img');
        // 获取名字
        const pageNo = $('#dedepagetitles>option[selected]');
        const pn = pageNo[0].children[0].data
        let src = item[0].attribs.src
        // output img
        let r = `<img src="${src}" />`;
        ctx.service.saveImage.main({src, fileName: pn, dirName: title, okCallBackFn: index => this.refreshRes(index)})
        return r;
    }

    getTitle(b) {
        const $ = cheerio.load(b);
        const $title = $('title');
        let title = $title[0].children[0].data.split(' ')[0];
        title = title.substr(0, title.indexOf('(') > 0 ? title.indexOf('(') : title.indexOf('_'));

        return title
    }

    refreshRes() {
        completeNo += 1;
        this.isEnd()
    }

    errorList(url) {
        errorList.push(url)
        this.isEnd()
    }

    isEnd() {
        const errLen = errorList.length;
        const allComplete = completeNo + errLen;

        console.log('\x1B[32m%s\x1B[39m', 'completeNo length is: ' + completeNo + '; errorList length is: ' + errLen + '; totalLen length is: ' + totalLen)
        if(allComplete === totalLen && errLen && retryCnt< 5) {
            this.retry(errorList)
            retryCnt += 1
        } else if(allComplete === totalLen) {
            console.log('\x1B[32m%s\x1B[39m', '----------- all complete ---------')
        }
    }

    retry(list) {
        const exList = JSON.parse(JSON.stringify(list))
        const {ctx} = this;
        console.log('\x1B[32m%s\x1B[39m', 'retry begin, list long is ' + exList.length);
        errorList = [];
        completeNo = 0;
        totalLen = exList.length;
        exList.map(async v => {
            try {
                const d = await ctx.service.queryWeb.query(v, {timeout: [1000, exList.length * 500 < 5000 ? 5000 :  exList.length * 500]})
                this.getOne(iconv.decode(d, 'gbk'))
            } catch (e) {
                this.errorList(v)
            }
        })
    }
}

module.exports = Analysis;
