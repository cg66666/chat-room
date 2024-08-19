/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2023-12-02 20:41:44
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-18 02:30:17
 */

// 数据库声明（注意执行顺序）
const { JsonDB, Config } = require('node-json-db')

// // account库，用于查重
// const accountId_db = new JsonDB(new Config('./db/accountDataBase', true, false, '/'))
// module.exports.accountId_db = accountId_db

// // 个人信息数据库
// const user_db = new JsonDB(new Config('./db/userDataBase', true, false, '/'))
// module.exports.user_db = user_db

// // 历史记录数据库（用于查询所有账号登录历史）
// const history_db = new JsonDB(new Config('./db/historyDataBase', true, false, '/'))
// module.exports.history_db = history_db

// // 登录token存储数据库（用于查询token是否失效）
// const loginToken_db = new JsonDB(new Config('./db/tokenDataBase', true, false, '/'))
// module.exports.loginToken_db = loginToken_db

const Koa = require('koa')
const { koaBody } = require('koa-body')

// 路由集成
const router = require('./controller')

// 统一处理返回内容
const handleResStatus = require('./middleware/handleResStatus')

const app = new Koa()

app.use(koaBody()) // 获取body上的内容

app.use(router.routes()) // 添加路由中间件

app.use(router.allowedMethods()) // 对请求进行一些限制处理

app.use(handleResStatus) // 对返回code码统一处理

const server = app.listen(8080, () => {
  let port = server.address().port
  console.log('服务器开启: http://localhost:8080/', port)
})
