/*
 * @Description: 测试
 * @Author: cg
 * @Date: 2023-12-02 21:16:00
 * @LastEditors: cg
 * @LastEditTime: 2024-08-28 18:32:04
 */
// const { user_db } = require('../app')
const koaRouter = require('koa-router')
const room_router = new koaRouter()
const { room_db } = require('../app')

// 创建房间
room_router.post('/create', async (ctx, next) => {
  const { room, user, password } = ctx.request.body
  if (await room_db.exists(`/${room}`)) {
    ctx.fail = {
      msg: `该房间已存在！`
    }
  } else {
    await room_db.push(`/${room}`, { password, userList: [user], updataTime: new Date().getTime() })
    ctx.success = {
      msg: `房间新建成功！`
    }
  }
  await next()
})

// 加入房间
room_router.post('/join', async (ctx, next) => {
  const { room, user, password } = ctx.request.body
  if (!(await room_db.exists(`/${room}`))) {
    ctx.fail = {
      msg: `进入失败！房间名错误或密码错误。`
    }
  } else {
    const roomInfo = await room_db.getData(`/${room}`)
    if (roomInfo.password !== password) {
      ctx.fail = {
        msg: `进入失败！房间名错误或密码错误。`
      }
    } else if (roomInfo.userList.indexOf(user) >= 0) {
      ctx.fail = {
        msg: `该用户名已存在！`
      }
    } else {
      roomInfo.updataTime = new Date().getTime()
      roomInfo.userList.push(user)
      await room_db.push(`/${room}`, roomInfo)
      ctx.success = {
        msg: `房间加入成功！`
      }
    }
  }
  await next()
})

// 离开房间
room_router.post('/leave', async (ctx, next) => {
  const { room, user } = ctx.request.body
  const roomInfo = await room_db.getData(`/${room}`)
  if (roomInfo.userList.length === 1) {
    await room_db.delete(`/${room}`)
  } else {
    const index = roomInfo.userList.indexOf(user)
    roomInfo.userList.splice(index, 1)
    if (roomInfo.userList.length === 0) {
      await room_db.delete(`/${room}`)
    } else {
      roomInfo.updataTime = new Date().getTime()
      await room_db.push(`/${room}`, roomInfo)
    }
  }
  ctx.success = {
    msg: `房间退出成功！`
  }
  await next()
})

module.exports = room_router
