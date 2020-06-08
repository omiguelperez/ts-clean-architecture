export interface ITaskReminder {
  message: string
  remindAt: Date
}

export class TaskReminder implements ITaskReminder {
  message: string
  remindAt: Date

  constructor ({ message, remindAt}: ITaskReminder) {
    this.message = message
    this.remindAt = remindAt
  }
}
