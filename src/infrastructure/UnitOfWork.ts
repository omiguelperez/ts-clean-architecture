import AuthorRepository from './repositories/AuthorRepository'
import TaskRepository from './repositories/TaskRepository'
import * as mongoose from 'mongoose'
import { ClientSession, Connection } from 'mongoose'
// import * as asyncRedis from 'async-redis'
import TaskReminderRepository from './repositories/TaskReminderRepository'
import IUnitOfWork from '../application/IUnitOfWork'
import config from '../config'
import getRedisConnection from './redis'

export default class UnitOfWork implements IUnitOfWork {

  authorRepository: AuthorRepository
  taskRepository: TaskRepository

  taskReminderRepository: TaskReminderRepository

  dbConnection: Connection
  dbSession: ClientSession

  redisConnection: any
  redisTransaction: any

  constructor () {
    this.authorRepository = (new AuthorRepository()).setuow(this)
    this.taskRepository = (new TaskRepository()).setuow(this)

    this.taskReminderRepository = (new TaskReminderRepository()).setuow(this)
  }

  async begin () {
    // this.dbConnection = await mongoose.createConnection(config.db.uri, config.db.options)
    this.dbConnection = mongoose.connection
    this.dbSession = await this.dbConnection.startSession()
    await this.dbSession.startTransaction()

    this.redisConnection = await getRedisConnection()
    this.redisTransaction = await this.redisConnection.multi()
  }

  async commit () {
    await this.dbSession.commitTransaction()

    console.log('commit::this.redisTransaction', this.redisTransaction)
    await this.redisTransaction.exec()
  }

  async rollback () {
    await this.dbSession.abortTransaction()

    console.log('discard::this.redisTransaction', this.redisTransaction)
    await this.redisTransaction?.discard()
  }

  async dispose () {
    await this.dbSession?.endSession()
    // await this.dbConnection?.close()

    // await this.redisConnection?.quit()
  }

}
