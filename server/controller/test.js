/*
 * @Description: 测试
 * @Author: cg
 * @Date: 2023-12-02 21:16:00
 * @LastEditors: cg
 * @LastEditTime: 2024-08-29 15:18:12
 */
// const { user_db } = require('../app')
const koaRouter = require('koa-router')
const test_router = new koaRouter()
const { room_db } = require('../app')

// 测试接口
test_router.get('/', async (ctx, next) => {
  //   const { a, b, c } = ctx.request
  console.log(111, ctx.query.a)
  console.log(111, ctx.query.b)
  console.log(111, ctx.query.c)

  //   if (await room_db.exists(`/${room}`)) {
  //     ctx.fail = {
  //       msg: `该房间已存在！`
  //     }
  //   } else {
  //     await room_db.push(`/${room}`, { password, userList: [user], updataTime: new Date().getTime() })
  //     ctx.success = {
  //       msg: `房间新建成功！`
  //     }
  //   }
  ctx.success = {
    msg: `房间新建成功！`
  }
  await next()
})

test_router.post('/', async (ctx, next) => {
  const { a, b, c } = ctx.request.body
  console.log(a, b, c)

  //   if (await room_db.exists(`/${room}`)) {
  //     ctx.fail = {
  //       msg: `该房间已存在！`
  //     }
  //   } else {
  //     await room_db.push(`/${room}`, { password, userList: [user], updataTime: new Date().getTime() })
  //     ctx.success = {
  //       msg: `房间新建成功！`
  //     }
  //   }
  ctx.success = {
    msg: `房间新建成功！`
  }
  await next()
})

// 加入房间
// test_router.post('/join', async (ctx, next) => {
//   const { room, user, password } = ctx.request.body

//   await next()
// })

// 离开房间
// test_router.post('/leave', async (ctx, next) => {
//   ctx.success = {
//     msg: `房间退出成功！`
//   }
//   await next()
// })

module.exports = test_router
