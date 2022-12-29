const Koa = require('koa2')
const app = new Koa()
const static = require('koa-static')
const cors = require('koa2-cors')
const { PORT } = require('./config')
const router = require('./router')
const { koaBody } = require('koa-body');
const jwt = require('koa-jwt');
const { SECRET } = require('./config')
const { verify } = require('jsonwebtoken');
const { getToken } = require('./utils')

app.use(cors());
app.use(static(__dirname + '/public'))
app.use(koaBody({ multipart: true }))


app.use(async (ctx, next) => {
    if (ctx.headers && ctx.headers.authorization) {
        const token = ctx.headers.authorization.split(' ')[1]
        let flag = true
        try {
            verify(token, SECRET, (err, data) => {
                if (err) {
                    switch (err.name) {
                        case 'JsonWebTokenError':
                            flag = false
                            ctx.body = {
                                code: 403,
                                msg: '无效的token!!!'
                            }
                            break
                        case 'TokenExpiredError':
                            flag = false
                            ctx.body = {
                                code: 403,
                                msg: 'token已经过期!!!'
                            }
                            break
                    }
                }
                else if (data.exp - new Date().getTime() / 1000 < 60 * 30) {
                    let refreshToken
                    if (data.email) refreshToken = getToken(data.email)
                    else refreshToken = getToken()
                    ctx.res.setHeader("Access-Control-Expose-Headers", "refresh_token");
                    ctx.set('refresh_token', refreshToken);//跨域后为了安全就去掉了自定义头，需要加上这句话 要不然前端一直拿不到
                }
            })
            if (flag) await next()//很重要这句好 这辈子都不想写后端了妈的

        } catch (err) {
            console.log(err);
        }
    }
    else {
        await next()
    }
});
app.use(jwt({
    secret: SECRET,
    debug: true // 开启debug可以看到准确的错误信息
}).unless({
    path: [
        /\/login/,
        /\/vistor/,
        /\/article\/detail/,
        /\/article\/keywords/,
        /list/,
        /total/,
        /all/,
        /insertComment/,
        /insertReply/,
    ]
}));
app.use(router.routes())

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:' + PORT);
})
