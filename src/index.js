import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { enviroment } from './utils/enviroment.js'
import SpyController from './controllers/spyController.js'
import TweetController from './controllers/tweetController.js'
import { cronScheduler } from './services/cronServices.js'

const app = express()
const port = enviroment.port || 8080

app.listen(port, () => {
  mongoose.connect(enviroment.mongoConnectionString).then(() => {
    console.log('Connected to mongo DB')
    cronScheduler()
  })
  console.log(`App ready on ${port}`)
})

app.use('/api/v1/spy', SpyController)

app.use('/api/v1/tweet', TweetController)
