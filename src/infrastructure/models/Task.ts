import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Author } from './Author'
import { Connection } from 'mongoose'
import * as uuid from 'uuid'

export class Task {

  @prop({
    default: uuid.v4
  })
  uuid: string

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
