import 'reflect-metadata'
import * as swaggerUi from 'swagger-ui-express'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import {
  createExpressServer,
  getMetadataArgsStorage,
  useContainer
} from 'routing-controllers'
import * as mongoose from 'mongoose'
import restApiControllers from './gateways/rest-api/controllers'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Container } from 'typedi'
import config from './config'


(async () => {
  await mongoose.connect(config.db.uri, config.db.options)

  const routingControllersOptions = {
    controllers: restApiControllers,
    routePrefix: '/api'
  }

  useContainer(Container)

  const app = createExpressServer(routingControllersOptions)

  // Parse routing-controllers classes into OpenAPI spec:
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/'
  })
  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: { schemas },
  })

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec))

  app.listen(config.app.port, (err: Error) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(`Server running on port ${ config.app.port }`)
  })
})()
