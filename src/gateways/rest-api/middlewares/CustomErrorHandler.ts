import {
  BadRequestError,
  ExpressErrorMiddlewareInterface,
  Middleware
} from 'routing-controllers'
import * as httpStatus from 'http-status-codes'
import { UseCaseInputValidationError } from '../../../application/UseCaseInput'


@Middleware({ type: 'after' })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

  error (err: any, req: any, res: any, next: (err: any) => any) {
    if (err instanceof BadRequestError) {
      // Transform routing-controllers error to standard error output
      res.status(err.httpCode).send(new UseCaseInputValidationError(err.errors))
    } else if (err instanceof ReferenceError ) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(this.mapReferenceError(err))
    }

    console.error(err)
    res.end()
    next()
  }

  private mapReferenceError (err: ReferenceError): any {
    return {
      name: err.name,
      type: err.name,
      message: err.message
    }
  }

}
