import * as DotEnv from 'dotenv'
import * as path from "path"

DotEnv.config({
  path: path.join(process.cwd(), '.env')
})

export default {
  app: {
    port: process.env.PORT || 3030,
  },
  db: {
    uri: process.env.MONGO_URI as string,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  redis: {
    url: process.env.REDIS_URL as string,
  },
}
