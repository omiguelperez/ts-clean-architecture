import { UseCaseInput } from '../../UseCaseInput'
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import AuthorRepository from '../../../infrastructure/repositories/AuthorRepository'
import UseCase from '../../UseCase'
import { ITask, Task } from '../../entities/Task'
import { TaskOutput } from './TaskOutput'


@ValidatorConstraint({ async: true })
export class IsAuthorDoesNotExistsConstraint implements ValidatorConstraintInterface {

  authorRepository: AuthorRepository

  constructor () {
    this.authorRepository = new AuthorRepository()
  }

  async validate (uuid: string, args: ValidationArguments) {
    const author = await this.authorRepository.getByUuid(uuid)
    return !!author
  }

}


export function IsAuthorDoesNotExists (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAuthorDoesNotExistsConstraint
    })
  }
}


export class CreateTaskInput extends UseCaseInput {

  @MaxLength(255, {
    message: 'Title is too long'
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @IsAuthorDoesNotExists({
    message: 'Author $value does not exists'
  })
  @IsUUID()
  @IsNotEmpty()
  author: string

  @IsPositive()
  @IsNumber()
  order: number

}


export class CreateTaskUseCase extends UseCase {

  async handle (input: CreateTaskInput): Promise<TaskOutput> {
    const author = await this.uow.authorRepository.getByUuid(input.author)

    const newTask = new Task(<ITask>{
      author,
      title: input.title,
      order: input.order
    })

    const task = await this.uow.taskRepository.add(newTask)
    return new TaskOutput(task)
  }

}
