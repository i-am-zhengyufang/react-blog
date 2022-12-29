const Category = require('../controller/category')
const Router = require('koa-router')
const category = new Router()
const { getAccess } = require('../utils')

category.prefix('/category')

category.get('/catelist', async (ctx) => {
    ctx.body = await Category.categorysList()
})

category.get('/total', async (ctx) => {
    const total = await Category.selectCount()
    ctx.body = total[0]
})

category.post('/add', async (ctx) => {
    if (getAccess(ctx)) {
        const { name } = ctx.request.body
        await Category.insert(name)
        ctx.body = {
            status: 200,
            msg: '添加成功'
        }
    }
})

category.post('/update', async (ctx) => {
    if (getAccess(ctx)) {
        const { id, name } = ctx.request.body
        await Category.update(id, name)
        ctx.body = {
            status: 200,
            msg: '修改成功',
        }
    }
})

category.post('/del', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        await Category.del(id)
        ctx.body = {
            status: 200,
            msg: '删除成功',
        }
    }
})

module.exports = category