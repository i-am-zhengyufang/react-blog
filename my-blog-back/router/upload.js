const uploadFunc = require('../controller/upload')
const Router = require('koa-router')
const upload = new Router()
const { getAccess } = require('../utils')

upload.prefix('/upload')


upload.post('/postImg', async (ctx) => {
    if (getAccess(ctx))
        await uploadFunc(ctx)
})



module.exports = upload