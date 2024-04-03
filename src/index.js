/* eslint-disable no-undef */
import express from 'express'
import axios from 'axios'
import cron from 'node-cron'
import { TwitterApi } from 'twitter-api-v2'

import 'dotenv/config'
import { URL_API_GET_SPY_PRICE } from './utils/consts.js'
import { generateTextTweetForAscOrDescPrice } from './utils/misc.js'
const app = express()

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`App ready on ${port}`)
})

const moneyParse = (money, currency = 'ARP') => {
  const formatter = new Intl.NumberFormat('es-AR', {
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
  return formatter.format(money)
}

app.get('/api/v1/syp', async (_req, res) => {
  try {
    const { data } = await axios.get(URL_API_GET_SPY_PRICE)

    res.send(moneyParse(data[0].Ultima))
  } catch {
    res.send('error fetching data')
  }
})

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET
})

//const bearer = new TwitterApi(process.env.BEARER_TOKEN)

const twitterClient = client.readWrite

const getSPYvalue = async () => {
  const { data } = await axios.get(URL_API_GET_SPY_PRICE)
  return moneyParse(data[data.length - 1].Ultima)
}

let oldValue = await getSPYvalue()

const createTweet = async () => {
  const value = await getSPYvalue()
  if (value != oldValue) {
    await twitterClient.v2.tweet(generateTextTweetForAscOrDescPrice(value, oldValue))
    oldValue = value
  }
}

cron.schedule('*/30 11-17 * * *', async () => {
  await createTweet()
})

app.get('/api/v1/twetts', async (_req, res) => {
  try {
    createTweet()
    res.send('created')
  } catch (e) {
    console.log(e)
    res.send('error fetching data')
  }
})
