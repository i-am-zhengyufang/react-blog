// const devMode=process.env.NODE_ENV==='development' 区分开发环境和生产环境


const QINIU = {};
QINIU.accessKey = ''; //七牛的accessKey
QINIU.secretKey = ''; //七牛的secretKey
QINIU.bucket = '';  //存储空间的名字
QINIU.origin = '';  //配置的域名

const PORT = 5000
const MYSQL_CONFIG = {
    host: '',//填服务器ip 数据库是本地的就填localhost
    port: 3306,
    database: '',//数据库名
    user: '',//用户名
    password: '',//密码
    charset: "utf8mb4",
    multipleStatements: true
}

const SECRET = ''//填自己的 用于token签发
module.exports = {
    PORT,
    MYSQL_CONFIG,
    QINIU,
    SECRET
}