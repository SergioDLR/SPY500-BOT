import { Router } from 'express'
import { getVariationSPY } from '../utils/misc'
import { getFirtsSpyValue, getLastSpyValue, saveSpyValue } from '../repository/SpyValues'

const router = Router()

router.get('/value', async (_req, res) => {
  try {
    const value = await getLastSpyValue()
    res.send(value)
  } catch {
    res.send('error fetching data')
  }
})
router.post('/value', async (_req, res) => {
  try {
    await saveSpyValue()
    return res.status(200).send('valor registrado correctamente')
  } catch {
    return res.status(500).send('No se pudo guardar un valor nuevo')
  }
})

router.get('/variation', async (_req, res) => {
  try {
    const value = await getVariationSPY()

    return res.status(200).send(`La variacion es del ${value} %`)
  } catch (e) {
    console.log(e)
    return res.status(500).send('No se puede calcular la variacion del cedear')
  }
})

router.get('/firstSpyToday', async (_req, res) => {
  try {
    const value = await getFirtsSpyValue()
    return res.status(200).send(value)
  } catch (e) {
    console.log(e)
    return res.status(500).send('No se pudo guardar un valor nuevo')
  }
})

export default router
