/*
 * @Description: 根据文件自动注册路由
 * @Author: cg
 * @Date: 2023-12-02 21:15:15
 * @LastEditors: cg
 * @LastEditTime: 2024-05-16 16:41:26
 */
/**
 * 文件名就是请求的前置route，使用fs统一配置
 */
const koaRouter = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new koaRouter()
const files = fs.readdirSync(__dirname)
files
  .filter((f) => {
    return f.endsWith('.js') && !f.startsWith('index')
  })
  .forEach((file) => {
    const file_name = file.substring(0, file.length - 3)
    const file_entity = require(path.join(__dirname, file))
    router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
  })

module.exports = router
