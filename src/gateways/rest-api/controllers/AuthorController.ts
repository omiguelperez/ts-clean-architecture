import { Body, Get, HttpCode, JsonController, Post } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'
import * as statusCode from 'http-status-codes'
import UnitOfWork from '../../../infrastructure/UnitOfWork'
import {
  CreateAuthorInput,
  CreateAuthorUseCase
} from '../../../application/use-cases/authors/CreateAuthorUseCase'
import { ListAuthorsUseCase } from '../../../application/use-cases/authors/ListAuthorsUseCase'
import { AuthorOutput } from '../../../application/use-cases/authors/AuthorUseCase'


@OpenAPI({})
@JsonController('/authors')
export default class AuthorController {

  uow: UnitOfWork

  constructor (uow: UnitOfWork) {
    this.uow = uow
  }

  @Get('/')
  @OpenAPI({
    summary: 'List all authors'
  })
  @ResponseSchema(AuthorOutput, {
    isArray: true
  })
  async list () {
    const useCase = new ListAuthorsUseCase(this.uow)
    return await useCase.execute()
  }

  @Post('/')
  @HttpCode(statusCode.CREATED)
  @OpenAPI({
    summary: 'Create a new author'
  })
  @ResponseSchema(AuthorOutput)
  async create (@Body({ validate: true }) input: CreateAuthorInput) {
    const useCase = new CreateAuthorUseCase(this.uow)
    return await useCase.execute(input)
  }

}
