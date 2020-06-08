import { Author } from '../entities/Author'

export default interface IAuthorRepository {

  add (authorEntity: Author): Promise<Author>

  getByUuid (uuid: string): Promise<Author | null>

  list (): Promise<Array<Author>>

}
