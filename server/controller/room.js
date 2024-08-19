/*
 * @Description: 测试
 * @Author: 朱晨光
 * @Date: 2023-12-02 21:16:00
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-08-19 09:36:38
 */
// const { user_db } = require('../app')
const koaRouter = require('koa-router')
const room_router = new koaRouter()

room_router.get('/test', async (ctx, next) => {
  console.log('ctx', ctx.request.ip)
  // const { registerInfo } = ctx.request.body;
  // registerInfo.createTime = new Date();
  // await user_db.push(`/${registerInfo.name}`, registerInfo);
  ctx.success = {
    msg: `get成功`
  }
  await next()
})

room_router.post('/test', async (ctx, next) => {
  console.log('ctx', ctx)
  // const { registerInfo } = ctx.request.body;
  // registerInfo.createTime = new Date();
  // await user_db.push(`/${registerInfo.name}`, registerInfo);
  ctx.success = {
    msg: `post成功`
  }
  await next()
})

module.exports = room_router
