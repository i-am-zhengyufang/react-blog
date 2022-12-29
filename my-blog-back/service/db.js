const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config')

const pool = mysql.createPool(MYSQL_CONFIG)

const query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err)
            else {
                connection.query(sql, function (err, res) {
                    if (err) reject(err)
                    else resolve(res)
                })
                connection.release()//释放连接
            }
        })
    })
}

exports.query = query