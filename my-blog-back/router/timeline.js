const Timeline = require('../controller/timeline')
const Router = require('koa-router')
const timeline = new Router()
const { getAccess } = require('../utils')

timeline.prefix('/timeline')

timeline.get('/timelinelist', async (ctx) => {
    ctx.body = await Timeline.timelineList()
})

timeline.post('/insert', async (ctx) => {
    if (getAccess(ctx)) {
        const { params } = ctx.request.body
        const id = await Timeline.insert(params)
        ctx.body = {
            status: 200,
            ...id[0],
            msg: '插入成功'
        }
    }
})

timeline.post('/update', async (ctx) => {
    if (getAccess(ctx)) {
        const { params } = ctx.request.body
        await Timeline.update(params)
        ctx.body = {
            status: 200,
            msg: '更新成功'
        }
    }
})
timeline.post('/del', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        Timeline.del(id)
        ctx.body = {
            status: 200,
            msg: '删除成功'
        }
    }
})


module.exports = timeline