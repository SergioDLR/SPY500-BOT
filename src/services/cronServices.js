import cron from 'node-cron'
import { CRON_DAILY_TIME_SCHEDULE, CRON_TIME_SCHEDULE } from '../utils/consts.js'
import { createDailyTweet, createTweet } from './tweetServices.js'
export const cronScheduler = () => {
  cron.schedule(CRON_TIME_SCHEDULE, async () => {
    await createTweet()
  })

  cron.schedule(CRON_DAILY_TIME_SCHEDULE, async () => {
    await createDailyTweet()
  })

  console.log('Cron started')
}
