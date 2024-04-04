/* eslint-disable no-undef */
import express from 'express'
import cron from 'node-cron'
import 'dotenv/config'
import { CRON_TIME_SCHEDULE } from './utils/consts.js'
import { generateTextTweetForAscOrDescPrice } from './utils/misc.js'
import { moneyParse } from './utils/parser.js'
import { getSPYvalue } from './services/spyServices.js'
import { twitterClient } from './services/twitterConnect.js'

const app = express()

const port = process.env.PORT || 8080

let oldValue = await getSPYvalue()

app.listen(port, () => {
  console.log(`App ready on ${port}`)
})

app.get('/api/v1/syp', async (_req, res) => {
  try {
    const value = await getSPYvalue()
    res.send(moneyParse(value))
  } catch {
    res.send('error fetching data')
  }
})

//TODO: ADD try catch!

const createTweet = async () => {
  const value = await getSPYvalue()
  if (value != oldValue) {
    await twitterClient.v2.tweet(generateTextTweetForAscOrDescPrice(value, oldValue))
    oldValue = value
  }
}

cron.schedule(CRON_TIME_SCHEDULE, async () => {
  await createTweet()
})

app.get('/api/v1/twetts', async (_req, res) => {
  try {
    await createTweet()
    res.send('created')
  } catch (e) {
    console.log(e)
    res.send('error fetching data')
  }
})
