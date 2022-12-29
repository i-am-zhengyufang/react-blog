// 就是cv timeline.js

const { query } = require('../service/db')

// 插入标签
const insert = async (params) => {
    const { content, time } = params
    const sql = `insert into timeline(content,time) values('${content}','${time}')`
    return await query(sql)
}

const update = async (params) => {
    const { id, content, time } = params
    const sql = `update timeline set content='${content}',time='${time}' where id=${id}`
    return await query(sql)
}

const del = async (id) => {
    const sql = `delete from timeline where id=${id}`
    return await query(sql)
}

const timelineList = async () => {
    const sql = 'select * from timeline order by time desc'
    return await query(sql)
}



module.exports = {
    insert,
    update,
    del,
    timelineList,
}