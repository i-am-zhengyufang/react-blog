const Comment = require('../controller/comment')
const Router = require('koa-router')
const { v4: uuidv4 } = require('uuid');
const { getAccess } = require('../utils')

const comment = new Router()


comment.prefix('/comment')

comment.get('/commentall', async (ctx) => {
    ctx.body = await Comment.commentall()
})

comment.get('/commentlist', async (ctx) => {
    const { id } = ctx.query
    ctx.body = await Comment.commentList(id)
})
comment.get('/total', async (ctx) => {
    const total = await Comment.commentLen()
    ctx.body = total[0]
})

comment.post('/insertComment', async (ctx) => {
    const { nickname,
        email,
        link,
        avatar,
        post_id,
        time,
        is_author,
        content } = ctx.request.body
    const id = uuidv4().replace(/-/g, '');//去掉-
    await Comment.insertComment(id, post_id, nickname, email, link, avatar, is_author, time, content)
    ctx.body = {
        status: 200,
        msg: '评论已经成功发表啦',
    }
})

comment.post('/insertReply', async (ctx) => {
    const { comment_id, nickname, time, content, email, avatar, link, is_author, to_reply_id, to_user_name } = ctx.request.body
    const id = uuidv4().replace(/-/g, '');//去掉-
    await Comment.insertReply(id, comment_id, nickname, time, content, email, avatar, link, is_author, to_reply_id, to_user_name)
    ctx.body = {
        status: 200,
        msg: '回复已经成功发表啦',

    }
})

comment.post('/delComment', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        await Comment.delComment(id)
        ctx.body = {
            status: 200,
            msg: '删除成功',
        }
    }
})

comment.post('/delReply', async (ctx) => {
    if (getAccess(ctx)) {
        const { id } = ctx.request.body
        await Comment.delReply(id)
        ctx.body = {
            status: 200,
            msg: '删除成功',
        }
    }
})


comment.post('/delMultiple', async (ctx) => {
    if (getAccess(ctx)) {
        const { arr } = ctx.request.body
        await Comment.delMultiple(arr)
        ctx.body = {
            status: 200,
            msg: '删除成功',
        }
    }
})


module.exports = comment