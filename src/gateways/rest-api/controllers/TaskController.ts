import { Get, JsonController } from 'routing-controllers'

const listTasks = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        title: 'Develop unit of work pattern sample',
        author: 'Oscar Pérez <mr.omiguelperez@gmail.com>',
        order: 1,
        createdAt: new Date()
      },
      {
        title: 'Upload project to GitHub',
        author: 'Oscar Pérez <mr.omiguelperez@gmail.com>',
        order: 2,
        createdAt: new Date()
      }
    ])
  }, 1000)
})


@JsonController()
export default class TaskController {

  @Get('/tasks')
  async list () {
    return await listTasks()
  }

}
