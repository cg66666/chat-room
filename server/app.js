/*
 * @Description: file content
 * @Author: cg
 * @Date: 2023-12-02 20:41:44
 * @LastEditors: cg
 * @LastEditTime: 2024-08-28 17:40:13
 */

// 引入日志工具
const { accessLogger, logger } = require('./log/index')
// 报错日志存储
module.exports.logger = logger

// 数据库声明（注意执行顺序）
const { JsonDB, Config } = require('node-json-db')

// 简易json数据库
const room_db = new JsonDB(new Config('./db/accountDataBase', true, false, '/'))
module.exports.room_db = room_db

// 加载定时期插件
require('./db/schedule')

const Koa = require('koa')
const { koaBody } = require('koa-body')

// 路由集成
const router = require('./controller')

// 统一处理返回内容
const handleResStatus = require('./middleware/handleResStatus')

// websocket
const ws = require('./ws/index')

const app = new Koa()

app.use(koaBody()) // 获取body上的内容

app.use(router.routes()) // 添加路由中间件

app.use(router.allowedMethods()) // 对请求进行一些限制处理

app.use(handleResStatus) // 对返回code码统一处理

// 添加日志功能
app.use(accessLogger())

const server = app.listen(8080, () => {
  let port = server.address().port
  console.log('服务器开启: http://localhost:8080/', port)
})

// 开启websocket
ws(server)
