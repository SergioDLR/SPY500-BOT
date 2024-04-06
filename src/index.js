import express from 'express'
import cron from 'node-cron'
import 'dotenv/config'
import { CRON_DAILY_TIME_SCHEDULE, CRON_TIME_SCHEDULE } from './utils/consts.js'
import { generateTextTweetForAscOrDescPrice } from './utils/misc.js'
import mongoose from 'mongoose'
import { getSPYvalue } from './services/spyServices.js'
import { twitterClient } from './services/twitterConnect.js'
import { enviroment } from './utils/enviroment.js'
import { getFirtsSpyValue, getLastSpyValue, saveNewSpyValue, saveSpyValue } from './repository/SpyValues.js'
import { moneyParse } from './utils/parser.js'

const app = express()

const port = enviroment.port || 8080

app.listen(port, () => {
  mongoose.connect(enviroment.mongoConnectionString).then(() => console.log('Connected to mongo DB'))
  console.log(`App ready on ${port}`)
})

app.get('/api/v1/spy', async (_req, res) => {
  try {
    const value = await getLastSpyValue()
    res.send(value)
  } catch {
    res.send('error fetching data')
  }
})

const createTweet = async () => {
  try {
    const value = await getSPYvalue()
    const oldValue = await getLastSpyValue()
    if (value != oldValue) {
      await twitterClient.v2.tweet(generateTextTweetForAscOrDescPrice(value, oldValue))
      //oldValue = value
      await saveNewSpyValue(value)
    }
  } catch (e) {
    console.log(e)
  }
}

const getVariationSPY = async () => {
  const firstValueOfDay = await getFirtsSpyValue()
  const lastValueOfDay = await getLastSpyValue()

  return parseFloat(((lastValueOfDay.value - firstValueOfDay.value) / firstValueOfDay.value) * 100).toFixed(2)
}

const createDailyTweet = async () => {
  try {
    const { value } = await getLastSpyValue()
    const variation = await getVariationSPY()

    await twitterClient.v2.tweet(
      `El SyP 500 cerro el dia con un valor del ${moneyParse(value)} ARS y vario un ${variation} % su valor`
    )
  } catch (e) {
    console.log(e)
  }
}

cron.schedule(CRON_TIME_SCHEDULE, async () => {
  await createTweet()
})

cron.schedule(CRON_DAILY_TIME_SCHEDULE, async () => {
  await createDailyTweet()
})

app.post('/api/v1/twetts', async (_req, res) => {
  try {
    await createTweet()
    //TODO: modificar para devolver un dto. Ademas de devolver el precio la hora y porcentaje de modificacion.
    res.send('created')
  } catch (e) {
    console.log(e)
    res.send('error fetching data')
  }
})

app.post('/api/v1/spy', async (_req, res) => {
  try {
    await saveSpyValue()
    return res.status(200).send('valor registrado correctamente')
  } catch {
    return res.status(500).send('No se pudo guardar un valor nuevo')
  }
})

app.get('/api/v1/firstSpyToday', async (_req, res) => {
  try {
    const value = await getFirtsSpyValue()
    return res.status(200).send(value)
  } catch (e) {
    console.log(e)
    return res.status(500).send('No se pudo guardar un valor nuevo')
  }
})

app.get('/api/v1/variation', async (_req, res) => {
  try {
    const value = await getVariationSPY()

    return res.status(200).send(`La variacion es del ${value} %`)
  } catch (e) {
    console.log(e)
    return res.status(500).send('No se puede calcular la variacion del cedear')
  }
})
