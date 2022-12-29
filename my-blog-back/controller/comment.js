const { query } = require('../service/db')


const commentLen = async () => {
    const sql = 'select count(*) as total from comment'
    return await query(sql)
}

const commentall = async () => {
    const sql = `select comment.id as id,title,nickname,email,avatar,comment.content,comment.time from 
    comment join articles on comment.post_id=articles.id order by time desc`
    const arr = await query(sql)
    for (let i of arr) {
        const t = i.id
        // ,'${i.title}' as title
        const sql2 = `select id,nickname,email,avatar,to_user_name,content,time from reply
        where reply.comment_id='${t}' order by time;`
        const arr2 = await query(sql2)
        if (arr2.length !== 0) i.replys = arr2
    }
    return arr
}

const commentList = async (id) => {
    const sql = `select id as comment_id,nickname,email,link,avatar,is_author,content,time from comment where
post_id=${id} order by time desc`
    const arr = await query(sql)
    for (let i of arr) {
        const t = i.comment_id
        const sql2 = `select id as reply_id,to_reply_id,to_user_name,nickname,email,link,avatar,is_author,content,time from reply where reply.comment_id='${t}' order by time;`
        const arr2 = await query(sql2)
        i.replys = arr2
    }
    return arr
}



const insertComment = async (id, post_id, nickname, email, link, avatar, is_author, time, content) => {
    const sql = `insert into comment
    values('${id}',${post_id},'${nickname}','${email}','${link}','${avatar}',${is_author},'${time}','${content}')
    `
    return await query(sql)
}

const insertReply = async (id, comment_id, nickname, time, content, email, avatar, link, is_author, to_reply_id, to_user_name) => {
    const sql = `insert into reply values('${id}','${comment_id}','${nickname}','${time}','${content}','${email}','${avatar}','${link}',${is_author},'${to_reply_id}','${to_user_name}')`
    return await query(sql)
}

const delComment = async (id) => {
    const sql = `delete from comment where id='${id}'`
    // 设置了级联删除 comment删除后reply自然没了
    return await query(sql)
}

const delReply = async (id) => {
    const sql = `delete from reply where id='${id}'`
    return await query(sql)
}

const delMultiple = async (arr) => {
    ['1', '2', '3']
    let cstr = ''
    let rstr = ''
    arr.filter(item => {
        if (item.title !== undefined) cstr += "'" + item.id + "'" + ","
        else rstr += "'" + item.id + "'" + ","
    })

    cstr = cstr.substring(0, cstr.length - 1)
    rstr = rstr.substring(0, rstr.length - 1)
    if (cstr) {
        const sql = `delete from comment where id in (${cstr})`
        await query(sql)
    }
    if (rstr) {
        const sql2 = `delete from reply where id in (${rstr})`
        await query(sql2)
    }
}

module.exports = {
    commentList,
    commentall,
    commentLen,
    insertComment,
    insertReply,
    delComment,
    delReply,
    delMultiple
}