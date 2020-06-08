import UseCase from '../../UseCase'
import { AuthorOutput } from './AuthorUseCase'


export class ListAuthorsUseCase extends UseCase {

  async handle (): Promise<Array<AuthorOutput>> {
    console.log('before list')
    const authors = await this.uow.authorRepository.list()
    console.log('after list')
    return authors.map((author: any) => new AuthorOutput(author))
  }

}
