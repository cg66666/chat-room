/*
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-28 17:01:41
 * @LastEditors: cg
 * @LastEditTime: 2024-08-28 18:18:21
 */
const path = require('path')
const log4js = require('koa-log4')
const RUNTIME_PATH = path.resolve(__dirname, '../')
const LOG_PATH = path.join(RUNTIME_PATH, 'log')

log4js.configure({
  // 日志的输出
  appenders: {
    common: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', //生成文件的规则
      alwaysIncludePattern: true, // 文件名始终以日期区分
      backups: 30,
      encoding: 'utf-8',
      filename: path.join(LOG_PATH, 'common.log') //生成文件名
    },
    fail: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      backups: 30,
      encoding: 'utf-8',
      filename: path.join(LOG_PATH, 'logger.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    common: { appenders: ['common'], level: 'info' },
    fail: { appenders: ['fail'], level: 'all' }
  }
})

// getLogger 传参指定的是类型
exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('common')) // 记录所有访问级别的日志
exports.logger = log4js.getLogger('fail')
