import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'
import restApiControllers from './gateways/rest-api/controllers'

const port = process.env.PORT || 3030

const app = createExpressServer({
  controllers: restApiControllers
})

app.listen(port, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server running on port ${ port }`)
})

