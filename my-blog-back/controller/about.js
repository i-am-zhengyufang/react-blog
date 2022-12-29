const { query } = require('../service/db')

const update = async (id, content) => {
    const sql = `update about set content='${content}'where id=${id}`
    return await query(sql)
}


const aboutList = async () => {
    const sql = 'select * from about'
    return await query(sql)
}



module.exports = {
    update,
    aboutList
}