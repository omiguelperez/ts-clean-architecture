import UseCase from '../../UseCase'
import { AuthorOutput } from './AuthorOutput'


export class ListAuthorsUseCase extends UseCase {

  async handle (): Promise<Array<AuthorOutput>> {
    const authors = await this.uow.authorRepository.list()
    return authors.map((author: any) => new AuthorOutput(author))
  }

}
