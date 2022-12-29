const Article = require('../controller/article')
const Router = require('koa-router')
const article = new Router()
const { getAccess } = require('../utils')

const formatArticle = (data) => {
    for (let element of data) {
        if (element.tags) element.tags = element.tags.split(',')
        if (element.tags_id) {
            element.tags_id = element.tags_id.split(',')
            element.tags_id = element.tags_id.map(item => parseInt(item))
        }
    }
    if (data.length == 1) return data[0]
}

article.prefix('/article')

article.get('/detail', async (ctx) => {
    const { id } = ctx.query
    const data = await Article.detail(id)
    formatArticle(data)
    ctx.body = data[0]
})

article.get('/keywords', async (ctx) => {
    const { keywords } = ctx.query
    const data = await Article.listByKeyWords(keywords)
    ctx.body = data
})

article.get('/listbycate', async (ctx) => {
    const { id } = ctx.query
    const result = await Article.listByCate(id)
    formatArticle(result)
    ctx.body = result
})

article.get('/listbytag', async (ctx) => {
    const { id } = ctx.query
    const result = await Article.listByTags(id)
    formatArticle(result)
    ctx.body = result
})

article.get('/articlelist', async (ctx) => {
    const { pageNo = 1, pageSize = 4, category_id, tags_id } = ctx.query
    let result, total
    if (category_id || tags_id) {
        // 如果传递过来有一个为空，则赋值null 注意此时ctx.query结构就需要let 而不是const
        let res = await Article.listFilter(pageNo, pageSize, category_id, tags_id)
        total = res.total
        result = res.result

    }
    else {
        result = await Article.listViews(pageNo, pageSize)
        total = await Article.selectCount()
    }
    formatArticle(result)
    ctx.body = {
        ...total[0],
        result
    }
})

article.get('/total', async (ctx) => {
    const total = await Article.selectCount()
    ctx.body = total[0]
})

article.post('/del', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        await Article.del(id)
        ctx.body = {
            status: 200,
            msg: '删除成功',
        }
    }
})

article.post('/insert', async (ctx) => {
    if (getAccess(ctx)) {
        const params = ctx.request.body
        await Article.insert(params)
        ctx.body = {
            status: 200,
            msg: '插入成功',
        }
    }
})

article.post('/update', async (ctx) => {
    if (getAccess(ctx)) {
        const params = ctx.request.body
        await Article.update(params)
        ctx.body = {
            status: 200,
            msg: '更新成功',
        }
    }
})

module.exports = article