import { getLastSpyValue, saveNewSpyValue } from '../repository/SpyValues'
import { generateDailyPorcentualForAscOrDescPrice, generateTextTweetForAscOrDescPrice } from '../utils/misc'
import { getSPYvalue } from './spyServices'
import { twitterClient } from './twitterConnect'

export const createTweet = async () => {
  try {
    const lastValue = await getSPYvalue()
    const { value } = await getLastSpyValue()

    if (value != lastValue) {
      await saveNewSpyValue(lastValue)
      await twitterClient.v2.tweet(generateTextTweetForAscOrDescPrice(lastValue, value))
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
