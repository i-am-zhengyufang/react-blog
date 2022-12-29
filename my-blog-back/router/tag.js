const Tag = require('../controller/tag')
const Router = require('koa-router')
const tag = new Router()
const { getAccess } = require('../utils')

tag.prefix('/tag')

// const color = ['#b58900', '#ff0000', '#ff01c6', '#add8e6', '#ffa07a', '#f08080',
//     '#ed4e67', '#20a938', '#d2ebae', '#41c1f0', '#ea1e63', '#fdf6e3', '#7981e0']
const color = ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
    "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
    "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
    "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
    "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"]

tag.get('/taglist', async (ctx) => {
    let result = await Tag.tagsList()
    // 一开始用的foreach，element=xx根本不能修改原数组
    result = result.map(element => {
        element.color = color[Math.floor(Math.random() * color.length)];
        return element
    });
    ctx.body = result
})

tag.get('/total', async (ctx) => {
    const total = await Tag.selectCount()
    ctx.body = total[0]
})

tag.post('/add', async (ctx) => {
    if (getAccess(ctx)) {
        const { name } = ctx.request.body
        await Tag.insert(name)
        ctx.body = {
            status: 200,
            msg: '添加成功'
        }
    }
})

tag.post('/update', async (ctx) => {
    if (getAccess(ctx)) {
        const { id, name } = ctx.request.body
        await Tag.update(id, name)
        ctx.body = {
            status: 200,
            msg: '修改成功',
        }
    }
})

tag.post('/del', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        await Tag.del(id)
        ctx.body = {
            status: 200,
            msg: '删除成功',
        }
    }
})

module.exports = tag