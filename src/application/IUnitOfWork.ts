import IAuthorRepository from './repositories/IAuthorRepository'

export default interface IUnitOfWork {

  authorRepository: IAuthorRepository

  begin (): Promise<void>

  commit (): Promise<void>

  rollback (): Promise<void>

  dispose(): Promise<void>
}
