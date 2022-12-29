const { query } = require('../service/db')

const insert = async (params) => {
    const { content, time } = params
    const sql = `insert into say(content,time) values('${content}','${time}')`
    await query(sql)
    const sql2 = `SELECT LAST_INSERT_ID() as id`
    return await query(sql2)//这个是返回id 不过前端没用了 直接reload爽快
}

const update = async (params) => {
    const { id, content, time } = params
    const sql = `update say set content='${content}',time='${time}' where id=${id}`
    return await query(sql)
}

const del = async (id) => {
    const sql = `delete from say where id=${id}`
    return await query(sql)
}

const sayList = async () => {
    const sql = 'select * from say order by time desc'
    return await query(sql)
}



module.exports = {
    insert,
    update,
    del,
    sayList
}