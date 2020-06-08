import { TaskReminder } from './TaskReminder'
import { Author } from './Author'

export interface ITask {
  author: Author
  title: string
  order: number
  reminders?: Array<TaskReminder>
  createdAt?: Date
}


export class Task implements ITask {
  author: Author
  title: string
  order: number
  reminders?: Array<TaskReminder> = []
  createdAt?: Date

  constructor ({ author, title, order }: ITask) {
    this.author = author
    this.title = title
    this.order = order
  }

  setReminder (reminder: TaskReminder) {
    this.reminders?.push(reminder)
  }

  setReminders (reminders: Array<TaskReminder>) {
    this.reminders = reminders
  }

  setCreationTimestamp (timestamp: Date) {
    this.createdAt = timestamp
  }
}
