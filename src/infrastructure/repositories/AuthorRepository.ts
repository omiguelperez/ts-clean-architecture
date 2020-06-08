import RedisMongoTSUOWRepository from './RedisMongoTSUOWRepository'
import { Author } from '../../application/entities/Author'
import IAuthorRepository from '../../application/repositories/IAuthorRepository'
import { getAuthorModel } from '../models/Author'

export default class AuthorRepository extends RedisMongoTSUOWRepository implements IAuthorRepository {

  private AuthorODM: any

  setup () {
    this.AuthorODM = getAuthorModel(this.uow?.dbConnection)

    return this
  }

  async add (authorEntity: Author): Promise<Author> {
    this.setup()

    const author = new this.AuthorODM({
      fullName: authorEntity.fullName,
      email: authorEntity.email,
    })
    await author.save()

    return new Author({
      uuid: author.uuid,
      fullName: author.fullName,
      email: author.email
    })
  }

  async getByUuid (uuid: string): Promise<Author | null> {
    this.setup()

    const author = await this.AuthorODM.findOne({ uuid })

    return !!author ? new Author({
      uuid: author.uuid,
      fullName: author.fullName,
      email: author.email
    }) : null
  }

  async list (): Promise<Array<Author>> {
    this.setup()

    const authors = await this.AuthorODM.find({})

    return authors.map((author: any) => new Author({
      uuid: author.uuid,
      fullName: author.fullName,
      email: author.email
    }))
  }

}
