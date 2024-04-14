import { URL_API_GET_SPY_PRICE } from '../utils/consts'

import axios from 'axios'

export const getSPYvalue = async () => {
  try {
    const { data } = await axios.get(URL_API_GET_SPY_PRICE)
    return data[data.length - 1].Ultima
  } catch (e) {
    console.log(e)
    throw new Error('No hay precio disponible')
  }
}
