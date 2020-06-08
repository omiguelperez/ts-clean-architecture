import IUnitOfWork from './IUnitOfWork'
import { IUseCaseInput } from './UseCaseInput'
import { IUseCaseOutput } from './UseCaseOutput'

export default abstract class UseCase {

  uow: IUnitOfWork

  constructor (uow: IUnitOfWork) {
    this.uow = uow
  }

  protected abstract async handle (input?: IUseCaseInput): Promise<IUseCaseOutput | Array<IUseCaseOutput>>

  async execute (input?: IUseCaseInput): Promise<IUseCaseOutput> {
    let output: IUseCaseOutput

    try {
      await this.uow.begin()

      output = await this.handle(input)

      await this.uow.commit()
    } catch (err) {
      await this.uow.rollback()

      throw err
    } finally {
      await this.uow.dispose()
    }

    return output
  }

}
