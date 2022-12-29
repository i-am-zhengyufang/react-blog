const Say = require('../controller/say')
const Router = require('koa-router')
const say = new Router()
const { getAccess } = require('../utils')

say.prefix('/say')

say.get('/saylist', async (ctx) => {
    ctx.body = await Say.sayList()
})

say.post('/insert', async (ctx) => {
    if (getAccess(ctx)) {
        const { params } = ctx.request.body
        const id = await Say.insert(params)
        ctx.body = {
            status: 200,
            ...id[0],
            msg: '插入成功'
        }
    }
})

say.post('/update', async (ctx) => {
    if (getAccess(ctx)) {
        const { params } = ctx.request.body
        await Say.update(params)
        ctx.body = {
            status: 200,
            msg: '更新成功'
        }
    }
})
say.post('/del', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        Say.del(id)
        ctx.body = {
            status: 200,
            msg: '删除成功'
        }
    }
})



module.exports = say