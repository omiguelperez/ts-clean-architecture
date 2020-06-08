import { Task } from '../entities/Task'

export default interface ITaskRepository {

  add (taskEntity: Task): Promise<Task>

  list (): Promise<Array<Task>>

}
