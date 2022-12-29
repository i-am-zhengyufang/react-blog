const uuid = require('uuid');
const fs = require('fs');
const uploadToQiniu = require('../service/qiniu');  // 七牛上传文件处理
const { QINIU } = require('../config'); // 七牛的配置信息

const uploadFunc = async (ctx) => {
    let files = ctx.request.files; // 获取formData文件信息
    if (files) {
        const file = files.file; // 获取formData文件信息
        // 文件名
        const fileName = uuid.v1();
        // 创建文件可读流
        const reader = fs.createReadStream(file.filepath);
        // 获取上传文件扩展名
        const ext = file.originalFilename.split(".").pop();
        // 命名文件以及拓展名
        const fileUrl = `${fileName}.${ext}`;
        //  上传文件到七牛并返回七牛文件目录
        const result = await uploadToQiniu(reader, fileUrl);
        if (result) {
            let url = `http://${QINIU.origin}/${result.key}`; // 获取上传文件 使用 （七牛配置域名+imgUrl）
            let name = file.originalFilename
            let data = { url, name }
            ctx.body = {
                code: 200,
                message: '上传成功',
                data
            }
        } else {
            ctx.body = {
                code: 500,
                message: '上传失败'
            }
        }
    } else {
        ctx.body = ctx.body = {
            code: 500,
            message: '请选择图片'
        }
    }
}


module.exports = uploadFunc