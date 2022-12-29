const About = require('../controller/about')
const Router = require('koa-router')
const about = new Router()
const { getAccess } = require('../utils')

about.prefix('/about')

about.get('/aboutlist', async (ctx) => {
    ctx.body = await About.aboutList()
})


about.post('/update', async (ctx) => {
    if (getAccess(ctx)) {
        const { id, content } = ctx.request.body
        await About.update(id, content)
    }
})

module.exports = about