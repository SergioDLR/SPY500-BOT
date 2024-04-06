import { TwitterApi } from 'twitter-api-v2'

import { enviroment } from '../utils/enviroment.js'

const { appKey, appSecret, accessToken, accessSecret } = enviroment

const client = new TwitterApi({
  appKey,
  appSecret,
  accessToken,
  accessSecret
})

//const bearer = new TwitterApi(process.env.BEARER_TOKEN)

export const twitterClient = client.readWrite
