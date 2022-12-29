const { query } = require('../service/db')
const mysql = require('mysql')
const find = async (email) => {
    let sql = `select * from admin where email=${mysql.escape(email)}`
    return await query(sql)
}

module.exports = { find }