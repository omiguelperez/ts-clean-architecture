import { Body, Get, HttpCode, JsonController, Post } from 'routing-controllers'
import UnitOfWork from '../../../infrastructure/UnitOfWork'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import * as statusCode from 'http-status-codes'
import {
  CreateTaskInput,
  CreateTaskUseCase
} from '../../../application/use-cases/tasks/CreateTaskUseCase'
import { ListTasksUseCase } from '../../../application/use-cases/tasks/ListTasksUseCase'


@JsonController()
export default class TaskController {

  uow: UnitOfWork

  constructor (uow: UnitOfWork) {
    this.uow = uow
  }

  @ResponseSchema('', {
    statusCode: 200,
    contentType: 'application/json'
  })
  @Get('/tasks')
  async list () {
    const useCase = new ListTasksUseCase(this.uow)
    return await useCase.execute()
  }

  @Post('/')
  @HttpCode(statusCode.CREATED)
  @OpenAPI({
    summary: 'Create a new task'
  })
  async add (@Body({ validate: true }) input: CreateTaskInput) {
    const useCase = new CreateTaskUseCase(this.uow)
    return await useCase.execute(input)
  }

}
