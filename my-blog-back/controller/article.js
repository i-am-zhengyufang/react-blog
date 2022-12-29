const { query } = require('../service/db')
const mysql = require('mysql')
// 插入文章
const insert = async (params) => {
    const { title, content, time, category_id, tags_id } = params

    const sql = `insert into articles(title,content,time,category_id)
    values(${mysql.escape(title)},${mysql.escape(content)},'${time}',${category_id})`
    await query(sql)
    const res = await query('SELECT max(id)  as newid from articles')//用last_insert_id会有很奇奇怪怪的错误我也不懂
    const newid = res[0].newid
    for (let tag_id of tags_id) {
        const sql2 = `insert into articles_tags(article_id,tag_id) values(${newid},${tag_id})`
        await query(sql2)
    }

}
// 更新文章 更新多对多：先删除在插入
const update = async (params) => {
    const { id, title, content, time, category_id, tags_id } = params
    const sql = `update articles set title=${mysql.escape(title)},content=${mysql.escape(content)},
    time='${time}',category_id=${category_id} where articles.id=${id}`
    await query(sql)
    const sql2 = `delete from articles_tags where article_id=${id}`
    await query(sql2)
    for (let tag_id of tags_id) {
        const sql3 = `insert into articles_tags(article_id,tag_id) values(${id},${tag_id})`
        await query(sql3)
    }
}
// 删除文章
const del = async (id) => {
    const sql = `delete from articles where id=${id}`
    return await query(sql)
}

const getCount = async () => {
    const sql = `select count(*) as total from articles`
    return await query(sql)
}

// 获取文章详情
const detail = async (id) => {
    const sql = `select articles.id,title,time,content,categorys.name as category,category_id,GROUP_CONCAT(tags.name) as tags,GROUP_CONCAT(tags.id) as tags_id from articles left join categorys on articles.category_id=categorys.id
    left join articles_tags on articles.id = articles_tags.article_id 
    left join tags on articles_tags.tag_id = tags.id where articles.id=${id};`
    return await query(sql)

}

// 关键词查询
const listByKeyWords = async (keywords) => {
    const sql = `select articles.id,title from articles where title like '%${keywords}%' order by time;`
    return await query(sql)
}

// 分类查询
const listByCate = async (id) => {
    const sql = `select articles.id,title,time,content,categorys.name as category,GROUP_CONCAT(tags.name) as tags from articles join categorys on articles.category_id=categorys.id join articles_tags on
articles.id = articles_tags.article_id join tags on articles_tags.tag_id = tags.id where categorys.id=${id} group by articles.id order by time;`
    return await query(sql)

}

// 标签查询
const listByTags = async (id) => {
    const sql = `select articles.id,title,time,content,categorys.name as category,GROUP_CONCAT(tags.name) as tags from articles join categorys on articles.category_id=categorys.id join articles_tags on
    articles.id = articles_tags.article_id join tags on articles_tags.tag_id = tags.id where articles.id in(select article_id from articles_tags where tag_id=${id}) group by articles.id order by time`
    return await query(sql)

}

// 分页查询
const listViews = async (pageNo, pageSize) => {
    const pageNum = (pageNo - 1) * pageSize
    const sql = `select id,title,time,content,category, tags from (select articles.id as id,title,time,content,categorys.name as category,GROUP_CONCAT(tags.name) as tags from articles left join categorys on articles.category_id=categorys.id left join articles_tags on
    articles.id = articles_tags.article_id left join tags on articles_tags.tag_id = tags.id group by articles.id) as a  
	order by time desc LIMIT ${pageNum},${pageSize}`
    return await query(sql)

}

const listFilter = async (pageNo, pageSize, category_id = null, tags_id = null) => {
    // 百度来，百度去都没有特别好的方法在limit同时返回总数
    const pageNum = (pageNo - 1) * pageSize
    const tag_id_list = Array.isArray(tags_id) ? tags_id.join() : tags_id
    const tagNull = tags_id === null

    const sql = `select id,title,time,content,category,tags from 
    (select articles.id as id,title,time,content,categorys.name as category,GROUP_CONCAT(tags.name) as tags from articles join categorys
     on articles.category_id=categorys.id and (${category_id} is null or articles.category_id=${category_id})
     join articles_tags 
     on articles.id = articles_tags.article_id join tags 
     on articles_tags.tag_id = tags.id and (${tagNull} or articles_tags.tag_id in (${tag_id_list}))
     group by articles.id) as a
     order by time desc LIMIT ${pageNum},${pageSize}`

    const sql2 = `select count(*) as total from (select count(*)  from articles 
     join articles_tags on articles.id = articles_tags.article_id
     where (${category_id} is null or articles.category_id=${category_id}) and 
     (${tagNull} or articles_tags.tag_id in (${tag_id_list})) 
     group by articles.id) as a`

    const total = await query(sql2)
    const result = await query(sql)
    return {
        total, result
    }
}

const selectCount = async () => {
    const sql = 'select count(*)as total from articles'
    return await query(sql)
}

module.exports = {
    insert,
    update,
    del,
    getCount,
    detail,
    listByKeyWords,
    listByCate,
    listByTags,
    listViews,
    listFilter,
    selectCount
}