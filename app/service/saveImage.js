'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path')

class SaveImage extends Service {
    /**
     * 保存图片
     * @param src
     * @param fileName
     * @param dirName
     * @param okCallBackFn
     * @param failCallBackFn
     * @returns {Promise<void>}
     */
    async main({src, fileName, dirName, okCallBackFn, failCallBackFn}) {
        if (!src) throw new Error('nothing 2 save');
        const saveDirName = this.app.userInfo.rootDir;
        const dir = `./${saveDirName}/${dirName}`;
        async function writeFile() {
            const {ctx} = this;
            const result = await ctx.curl(src);
            const filePath = `${dir}/${fileName}.png`
            fs.writeFile(path.resolve(filePath), result.data, {flag: 'w'}, function (err) {
                if (err) {
                    console.log(err);
                    failCallBackFn && failCallBackFn()
                }
                // console.log('\x1B[32m%s\x1B[39m', filePath + ' save ok')
                okCallBackFn && okCallBackFn(fileName)
            });
        }

        // 检查文件夹是否需存在，写入文件
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, { recursive: true }, async (err) => {
                if (err) throw err;
                await writeFile.call(this);
            });
        } else {
            await writeFile.call(this);
        }
        return dir;
    }
}

module.exports = SaveImage;
