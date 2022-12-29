const { query } = require('../service/db')

// 插入标签
const insert = async (name) => {
    const sql = `insert into tags(name) values('${name}')`
    return await query(sql)
}

const update = async (id, name) => {
    const sql = `update tags set name='${name}' where id=${id}`
    return await query(sql)
}

const del = async (id) => {
    const sql = `delete from tags where id=${id}`
    return await query(sql)
}

const getCount = async () => {
    const sql = `select count(*) as total from tags`
    return await query(sql)
}

// 获取所有标签
const tagsList = async () => {
    const sql = `select tags.id,tags.name,IFNULL(count(articles_tags.article_id),0) as count from tags left join articles_tags 
    on tags.id=articles_tags.tag_id group by tags.id`
    return await query(sql)
}


const selectCount = async () => {
    const sql = 'select count(*)as total from tags'
    return await query(sql)
}

module.exports = {
    insert,
    update,
    del,
    getCount,
    tagsList,
    selectCount
}