import { Get, JsonController } from 'routing-controllers'
import UnitOfWork from '../../../infrastructure/UnitOfWork'
import { ResponseSchema } from 'routing-controllers-openapi'

const listTasks = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        title: 'Develop unit of work pattern sample',
        author: {
          fullName: 'Oscar Pérez',
          email: 'mr.omiguelperez@gmail.com'
        },
        order: 1,
        createdAt: new Date()
      },
      {
        title: 'Upload project to GitHub',
        author: {
          fullName: 'Oscar Pérez',
          email: 'mr.omiguelperez@gmail.com'
        },
        order: 2,
        createdAt: new Date()
      }
    ])
  }, 1000)
})


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
    return await listTasks()
  }

}
