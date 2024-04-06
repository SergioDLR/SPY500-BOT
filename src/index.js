import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { enviroment } from './utils/enviroment.js'
import SpyController from './controllers/spyController.js'
import TweetController from './controllers/tweetController.js'
import { cronScheduler } from './services/cronServices.js'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import { getLastSpyValue } from './repository/SpyValues.js'
import nunjucks from 'nunjucks'
import { moneyParse } from './utils/parser.js'

const app = express()
const port = enviroment.port || 8080

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

app.get('/', async (req, res) => {
  const { value } = await getLastSpyValue()
  const parsed = moneyParse(value)
  res.render('home', { value: parsed })
})
