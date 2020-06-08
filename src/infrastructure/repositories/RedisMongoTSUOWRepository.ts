import UnitOfWork from '../UnitOfWork'

export default class RedisMongoTSUOWRepository {

  uow: UnitOfWork

  public setuow (uow: UnitOfWork): any {
    this.uow = uow
    return this
  }

}
