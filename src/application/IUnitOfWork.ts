import IAuthorRepository from './repositories/IAuthorRepository'
import ITaskRepository from './repositories/ITaskRepository'

export default interface IUnitOfWork {

  authorRepository: IAuthorRepository
  taskRepository: ITaskRepository

  begin (): Promise<void>

  commit (): Promise<void>

  rollback (): Promise<void>

  dispose(): Promise<void>
}
