import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import UseCase from '../../UseCase'
import { UseCaseInput } from '../../UseCaseInput'
import { Author } from '../../entities/Author'
import { AuthorOutput } from './AuthorUseCase'


export class CreateAuthorInput extends UseCaseInput {

  @MaxLength(50, {
    message: 'Full name is too long'
  })
  @MinLength(2, {
    message: 'Full name is too short'
  })
  @IsString()
  @IsNotEmpty()
  fullName: string

  @MaxLength(50, {
    message: 'Email is too long'
  })
  @MinLength(5, {
    message: 'Email is too short'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

}


export class CreateAuthorUseCase extends UseCase {

  async handle (input: CreateAuthorInput): Promise<AuthorOutput> {
    const newAuthor = new Author({
      fullName: input.fullName,
      email: input.email,
    })

    const author = await this.uow.authorRepository.add(newAuthor)
    return new AuthorOutput(author)
  }

}
