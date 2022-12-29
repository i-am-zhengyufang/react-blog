const { query } = require('../service/db')

// 插入标签
const insert = async (name) => {
    const sql = `insert into categorys(name) values('${name}')`
    return await query(sql)
}

const update = async (id, name) => {
    const sql = `update categorys set name='${name}' where id=${id}`
    return await query(sql)
}

const del = async (id) => {
    const sql = `delete from categorys where id=${id}`
    return await query(sql)
}


// 获取所有分类
const categorysList = async () => {
    const sql = `select categorys.id ,categorys.name, IFNULL(count(articles.id),0) as count from categorys left join articles 
    on categorys.id=articles.category_id group by categorys.id`
    return await query(sql)
}


const selectCount = async () => {
    const sql = 'select count(*)as total from categorys'
    return await query(sql)
}
module.exports = {
    insert,
    update,
    del,
    categorysList,
    selectCount
}