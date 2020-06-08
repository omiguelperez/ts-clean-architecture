import { validate } from 'class-validator'
import * as _ from 'lodash'


const USE_CASE_INPUT_VALIDATOR_ERROR = 'UseCaseInputValidationError'


export class UseCaseInputValidationError extends Error {

  errors: Array<any>
  type: string

  constructor (errors: Array<any>) {
    super()
    this.errors = this.transform(errors)

    this.name = USE_CASE_INPUT_VALIDATOR_ERROR
    this.type = USE_CASE_INPUT_VALIDATOR_ERROR

    delete this.stack
  }

  private transform (errors: Array<any>): Array<any> {
    return errors.map(error => {
      const transformed: any = {}
      transformed[error.property] = _.values(error.constraints)
      return transformed
    })
  }

}


export interface IUseCaseInput {

}


export class UseCaseInput implements IUseCaseInput {

  async validate () {
    const results = await validate(this)

    if (results.length) {
      const error = new UseCaseInputValidationError(results)
      throw error
    }
  }

}
