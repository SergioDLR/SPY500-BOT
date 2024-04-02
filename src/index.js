/* eslint-disable no-undef */
import express from 'express'
import axios from 'axios'
import cron from 'node-cron'
import { TwitterApi } from 'twitter-api-v2'
import { Client, auth } from 'twitter-api-sdk'
import 'dotenv/config'
const app = express()

const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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
    const { data } = await axios.get(
      'https://iol.invertironline.com/Titulo/GraficoIntradiario?idTitulo=110178&idTipo=2&idMercado=1'
    )

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

const bearer = new TwitterApi(process.env.BEARER_TOKEN)

const twitterClient = client.readWrite

const getSPYvalue = async () => {
  const { data } = await axios.get(
    'https://iol.invertironline.com/Titulo/GraficoIntradiario?idTitulo=110178&idTipo=2&idMercado=1'
  )
  return moneyParse(data[0].Ultima)
}

const initialValue = await getSPYvalue()

console.log(initialValue)
const createTweet = async () => {
  const value = await getSPYvalue()
  console.log(value != initialValue)
  if (value != initialValue) await twitterClient.v2.tweet(`El valor del cedear syp500 es de ${value}`)
}

cron.schedule('*/10 * * * *', () => {
  createTweet()
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
