import { IUseCaseOutput } from '../../UseCaseOutput'
import { IsNumber, IsString } from 'class-validator'
import { AuthorOutput } from '../authors/AuthorOutput'
import { Task } from '../../entities/Task'

export class TaskOutput implements IUseCaseOutput {

  @IsString()
  uuid?: string

  @IsString()
  title: string

  author: AuthorOutput

  @IsNumber()
  order: number

  constructor (task: Task) {
    this.uuid = task.uuid
    this.title = task.title
    this.author = new AuthorOutput(task.author)
    this.order = task.order
  }

}
