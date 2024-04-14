import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { enviroment } from './utils/enviroment'
import SpyController from './controllers/spyController'
import TweetController from './controllers/tweetController'
import { cronScheduler } from './services/cronServices'
import path from 'path'
import { fileURLToPath } from 'url'
import ViewsController from './controllers/viewsController'
import nunjucks from 'nunjucks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = enviroment.port ?? 8080

app.use(express.static('public'))
nunjucks.configure(`${__dirname}/views`, {
  autoescape: true,
  express: app
})

app.set('view engine', 'njk')
app.listen(port, () => {
  mongoose.connect(enviroment.mongoConnectionString).then(() => {
    console.log('Connected to mongo DB')
    cronScheduler()
  })
  console.log(`App ready on ${port}`)
})

app.use('/api/v1/spy', SpyController)

app.use('/api/v1/tweet', TweetController)

app.use('/', ViewsController)
