import { getLastSpyValue, saveNewSpyValue } from '../repository/SpyValues.js'
import { generateDailyPorcentualForAscOrDescPrice, generateTextTweetForAscOrDescPrice } from '../utils/misc.js'
import { getSPYvalue } from './spyServices.js'
import { twitterClient } from './twitterConnect.js'

export const createTweet = async () => {
  try {
    const value = await getSPYvalue()
    const oldValue = await getLastSpyValue()
    if (value != oldValue) {
      await twitterClient.v2.tweet(generateTextTweetForAscOrDescPrice(value, oldValue))
      await saveNewSpyValue(value)
    }
  } catch (e) {
    console.log(e)
  }
}

export const createDailyTweet = async () => {
  try {
    await twitterClient.v2.tweet(await generateDailyPorcentualForAscOrDescPrice())
  } catch (e) {
    console.log(e)
  }
}
