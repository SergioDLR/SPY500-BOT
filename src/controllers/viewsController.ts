import dayjs from 'dayjs'
import { Router } from 'express'
import { moneyParse } from '../utils/parser'
import { getLastSpyValue, getSPYValuesInDates } from '../repository/SpyValues'
import { getVariationSPY } from '../utils/misc'

const router = Router()
router.get('/', async (_req, res) => {
  const { value } = await getLastSpyValue()
  const parsed = moneyParse(value)
  const variation = await getVariationSPY()
  res.render('home', { value: parsed, variation })
})

router.get('/historicos', async (_req, res) => {
  res.render('variation')
})

router.get('/historicos/withDate', async (req, res) => {
  const { dateFrom, dateTo } = req.query
  const values = await getSPYValuesInDates(String(dateFrom ?? ''), String(dateTo ?? ''))

  res.render('variationWithDates', {
    values: values.map((value) => ({
      date: dayjs(value.date).format('DD/MM/YYYY hh:mm'),
      value: `${moneyParse(value.value)} ARS`
    }))
  })
})

export default router
