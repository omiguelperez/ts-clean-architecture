import { IUseCaseOutput } from '../../UseCaseOutput'
import { IsEmail, IsString, IsUUID } from 'class-validator'
import { Author } from '../../entities/Author'

export class AuthorOutput implements IUseCaseOutput {

  @IsUUID()
  uuid: string

  @IsString()
  fullName: string

  @IsEmail()
  email: string

  constructor (authorEntity: Author) {
    if (typeof authorEntity.uuid === 'string') {
      this.uuid = authorEntity.uuid
    }

    this.fullName = authorEntity.fullName
    this.email = authorEntity.email
  }
}
