const Login = require('../controller/login')
const Router = require('koa-router')
const login = new Router()
const { verify } = require('jsonwebtoken');
const { SECRET } = require('../config')
const { getToken } = require('../utils')




login.post('/login', async (ctx) => {
    const { email, password } = ctx.request.body
    const findResult = await Login.find(email);
    const pwd = findResult[0]?.password;
    if (findResult.length == 0) {
        ctx.body = { code: 404, msg: '用户不存在!' };
    } else {
        if (password === pwd) {
            const token = getToken(email)
            ctx.body = { code: 200, msg: '登录成功!', token };
        } else {
            ctx.body = { code: 400, msg: '密码错误!' };
        }
    }
})


login.get('/vistor', async (ctx) => {
    const token = getToken()
    ctx.body = { code: 200, msg: '登录成功!', token };
})

login.post('/getInfo', async (ctx) => {
    const token = ctx.headers.authorization.split(' ')[1]
    let payload = verify(token, SECRET)

    if (payload.role === 'vistor') ctx.body = {
        name: '游客',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        role: 'vistor'
    }
    else {
        const adminInfo = await Login.find(payload.email);
        ctx.body = {
            name: adminInfo[0].nickname,
            avatar: adminInfo[0].avatar,
            email: adminInfo[0].email,
            role: 'admin'
        }
    }
})





module.exports = login