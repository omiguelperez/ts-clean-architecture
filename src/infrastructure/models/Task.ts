import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Author } from './Author'
import { Connection } from "mongoose"

export class Task {

  @prop()
  title: string

  @prop({
    ref: 'Author'
  })
  author: Ref<Author>

  @prop()
  order: number

  @prop({
    default: new Date()
  })
  createdAt: Date

}


export function getTaskModel (existingConnection?: Connection) {
  if (existingConnection) return getModelForClass(Task, { existingConnection })
  return getModelForClass(Task)
}
