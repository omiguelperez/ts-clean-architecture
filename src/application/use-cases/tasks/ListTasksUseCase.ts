import UseCase from '../../UseCase'
import { TaskOutput } from './TaskOutput'


export class ListTasksUseCase extends UseCase {

  async handle (): Promise<Array<TaskOutput>> {
    const tasks = await this.uow.taskRepository.list()
    return tasks.map((task: any) => new TaskOutput(task))
  }

}
