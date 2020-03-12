'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path')
// 默认保存文件夹
const saveDirName = 'user';
class Files extends Service {
    /**
     * 保存文件
     * @param context
     * @param fileName
     * @param dirName
     * @param okCallBackFn
     * @param failCallBackFn
     * @returns {Promise<void>}
     */
    async savefile({context, fileName, dirName, okCallBackFn, failCallBackFn}) {
        if (!context) throw new Error('nothing 2 save');
        const dir = `./${saveDirName}/${dirName}`;
        async function writeFile() {
            const filePath = `${dir}/${fileName}.json`
            fs.writeFile(path.resolve(filePath), context, {flag: 'w'}, function (err) {
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
    }

    /**
     * 读取文件
     * @param fileName
     * @param dirName
     * @param okCallBackFn
     * @param failCallBackFn
     * @returns {Promise<void>}
     */
    async readFile({fileName, dirName, okCallBackFn, failCallBackFn}) {
        return fs.readFileSync(`./${saveDirName}/${dirName}/${fileName}`, 'utf8');
    }
}

module.exports = Files;
