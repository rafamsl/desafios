import winston from 'winston'
import { DATE_UTILS } from './index.js'

function buildProdLogger() {
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'prod_error.log', level: 'error' }),
    ],
  })
  return prodLogger
}

function buildDevLogger() {
  const devLogger = winston.createLogger({
    transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({ filename: './logs/dev_warn.log', level: 'warn' }),
      new winston.transports.File({ filename: './logs/dev_error.log', level: 'error' }),
    ],
  })
  return devLogger
}

let logger = null

if (process.env.NODE_ENV === 'PROD') {
  logger = buildProdLogger()
} else {
  logger = buildDevLogger()
}

function info_log(route,method){
  logger.info({ timestamp: DATE_UTILS.getTimestamp(), message: `Route: ${route} || Method: ${method}` })
}
function error_log(route,method,error){
  logger.error({ timestamp: DATE_UTILS.getTimestamp(), message: `Route: ${route} || Method: ${method} || Error: ${error}` })
}
function warn_log(route,method,error){
  logger.warn({ timestamp: DATE_UTILS.getTimestamp(), message: `Route: ${route} || Method: ${method} || Warn: ${error}` })
}

export const LOGGER_UTILS = { info_log, error_log,warn_log };
