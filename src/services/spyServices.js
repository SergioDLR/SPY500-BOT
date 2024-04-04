import { URL_API_GET_SPY_PRICE } from '../utils/consts.js'
import { moneyParse } from '../utils/parser.js'
import axios from 'axios'

export const getSPYvalue = async () => {
  try {
    const { data } = await axios.get(URL_API_GET_SPY_PRICE)
    return moneyParse(data[data.length - 1].Ultima)
  } catch (e) {
    console.log(e)
  }
}
