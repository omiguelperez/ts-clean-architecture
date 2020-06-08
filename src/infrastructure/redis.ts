import config from '../config'
import * as redis from 'redis'
import * as chalk from 'chalk'
import * as promise from 'bluebird'
import Debug from 'debug'

const debug = Debug('tsuow')

promise.promisifyAll(redis.RedisClient.prototype)
promise.promisifyAll(redis.Multi.prototype)

export default function getRedisConnection () {
  return new Promise((resolve, reject) => {
    const connector = redis.createClient(config.redis.url, {
      retry_strategy: function (options) {
        if (options.error &&
          (options.error.code === 'ECONNREFUSED'
            || options.error.code === 'NR_CLOSED'
            || options.error.code === 'ENOTFOUND')
        ) {
          // Try reconnecting after 5 seconds
          console.error('The Redis server refused the connection. Retrying connection...')
          return 5000
        }
        if (options.total_retry_time > 10000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error('Retry Redis connection time exhausted')
        }
        if (options.attempt > 10000) {
          // End reconnecting with built in error
          return undefined
        }
        // reconnect after
        return Math.min(options.attempt * 10, 30)
      }
    })
    debug(chalk.yellowBright(`Trying to connect to redis ${ config.redis.url }`))

    connector.on('error', () => {
      reject(new Error(`Redis Connection failed ${ config.redis.url }`))
    })
    connector.on('reconnecting', () => {
      debug(chalk.greenBright(`Redis reconnecting ${ config.redis.url }`))
    })

    connector.on('end', () => {
      debug(chalk.greenBright(`Redis Connection close ${ config.redis.url } OK`))
    })

    connector.on('connect', () => {
      debug(chalk.greenBright(`Connected to redis ${ config.redis.url }`))
      resolve(connector)
    })
  })
}
