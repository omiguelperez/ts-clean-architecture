import { Author } from '../entities/Author'

export default interface IAuthorRepository {

  add (authorEntity: Author): Promise<Author>

  list (): Promise<Array<Author>>

}
