import { getModelForClass, prop } from '@typegoose/typegoose'
import { Connection } from 'mongoose'
import * as uuid from 'uuid'

export class Author {

  @prop({
    default: uuid.v4
  })
  uuid: string

  @prop()
  fullName: string

  @prop()
  email: string

}

export function getAuthorModel (existingConnection?: Connection) {
  if (existingConnection) return getModelForClass(Author, { existingConnection })
  return getModelForClass(Author)
}
