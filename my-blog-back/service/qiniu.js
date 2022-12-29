const qiniu = require('qiniu')
const { QINIU } = require('../config')
// https://blog.csdn.net/weixin_42373488/article/details/124847903?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-4-124847903-blog-100603727.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-4-124847903-blog-100603727.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=8

const uploadToQiniu = (filePath, key) => {
    const ak = QINIU.accessKey
    const sk = QINIU.secretKey
    const mac = new qiniu.auth.digest.Mac(ak, sk)
    const options = {
        scope: QINIU.bucket
    }
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac)
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2
    const localFile = filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    return new Promise((resolved, reject) => {
        formUploader.putStream(token, key, localFile, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr)
            } else {
                //  返回的是key:文件名和hash:文件信息
                // "hash": "XXX",
                // "key": "public/b59b7a70-d686-11ec-bed9-1fde74428146.jpg"
                resolved(respBody)
            }
        })
    })
}
module.exports = uploadToQiniu 