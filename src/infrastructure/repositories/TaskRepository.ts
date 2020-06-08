import RedisMongoTSUOWRepository from './RedisMongoTSUOWRepository'
import ITaskRepository from '../../application/repositories/ITaskRepository'
import { Task } from '../../application/entities/Task'
import { getAuthorModel } from '../models/Author'
import { getTaskModel } from '../models/Task'
import { Author } from '../../application/entities/Author'


export default class TaskRepository extends RedisMongoTSUOWRepository implements ITaskRepository {

  private TaskODM: any
  private AuthorODM: any

  setup () {
    this.TaskODM = getTaskModel(this.uow.dbConnection)
    this.AuthorODM = getAuthorModel(this.uow.dbConnection)

    return this
  }

  private mapTaskDocToEntity (task: any): Task {
    return new Task({
      uuid: task.uuid,
      title: task.title,
      order: task.order,
      author: new Author({
        uuid: task.author.uuid,
        fullName: task.author.fullName,
        email: task.author.email,
      })
    })
  }

  private mapTaskCollToEntityList (tasks: Array<any>): Array<Task> {
    return tasks.map(task => this.mapTaskDocToEntity(task))
  }

  async add (taskEntity: Task): Promise<Task> {
    this.setup()

    const author = await this.AuthorODM.findOne({
      uuid: taskEntity.author.uuid
    })

    const task = new this.TaskODM({
      title: taskEntity.title,
      author,
      order: taskEntity.order,
    })
    await task.save()

    return this.mapTaskDocToEntity(task)
  }

  async list (): Promise<Array<Task>> {
    this.setup()

    const tasks = await this.TaskODM.find({}).populate('author')
    return this.mapTaskCollToEntityList(tasks)
  }

}
