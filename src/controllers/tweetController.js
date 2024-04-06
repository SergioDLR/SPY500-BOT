import { Router } from 'express'
import { createTweet } from '../services/tweetServices.js'

const router = Router()

router.post('/newValue', async (_req, res) => {
  try {
    await createTweet()
    res.send('created')
  } catch (e) {
    console.log(e)
    res.send('error fetching data')
  }
})
export default router
