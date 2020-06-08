export interface IAuthor {
  fullName: string
  email: string
  uuid?: string
}

export class Author implements IAuthor {
  uuid?: string
  fullName: string
  email: string

  constructor ({ fullName, email, uuid }: IAuthor) {
    this.uuid = uuid
    this.fullName = fullName
    this.email = email
  }
}
