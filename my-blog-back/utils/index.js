const { SECRET } = require('../config')
const { verify, sign } = require('jsonwebtoken');

function getToken(email) {
    let token
    if (email)
        token = sign({ role: 'admin', email }, SECRET, // secret
            { expiresIn: '1day' })
    else token = sign({ role: 'vistor' }, SECRET, { expiresIn: '1day' })
    return token
}

function getAccess(ctx) {
    const token = ctx.headers.authorization.split(' ')[1]
    verify(token, SECRET, (err, data) => {
        if (data.role === 'vistor') {
            ctx.body = {
                code: 403,
                msg: '游客没有权限哦'
            }
            return false
        }
    })
    return true
}
module.exports = {
    getToken,
    getAccess
}