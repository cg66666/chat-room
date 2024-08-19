/*
 * @Description: file content
 * @Author: 朱晨光
 * @Date: 2023-12-02 21:21:12
 * @LastEditors: 朱晨光
 * @LastEditTime: 2024-05-27 10:34:12
 */

module.exports = async (ctx, next) => {
  if (ctx.success) {
    if (!ctx.success.code && ctx.success.code !== 0) ctx.success.code = '00000'
    ctx.body = ctx.success
  } else if (ctx.fail) {
    if (!ctx.fail.code) ctx.fail.code = 'A0001' // 失败的情况，msg提示内容
    ctx.body = ctx.fail
  }
  console.log('最终返回值', ctx.body)
  await next()
}
