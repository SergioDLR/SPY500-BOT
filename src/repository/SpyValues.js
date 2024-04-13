import dayjs from 'dayjs'

import SpyValuesScheme from '../Schemas/SpyValues.js'
import { getSPYvalue } from '../services/spyServices.js'
export const saveSpyValue = async () => {
  return SpyValuesScheme.create({ value: await getSPYvalue(), date: dayjs() })
}

export const getLastSpyValue = async () => {
  return SpyValuesScheme.findOne().sort({ date: -1 }).limit(1).lean().exec()
}

export const saveNewSpyValue = async (newValue) => {
  return SpyValuesScheme.create({ value: newValue, date: dayjs() })
}

export const getFirtsSpyValue = async () => {
  const yesterdayAt12Date = dayjs().subtract(1, 'day').startOf('day')
  return SpyValuesScheme.findOne({ date: { $gt: yesterdayAt12Date } })
    .sort({ _id: 1 })
    .limit(1)
    .lean()
    .exec()
}

export const getSPYValuesInDates = async (dateStart, dateEnd) => {
  return SpyValuesScheme.find({ date: { $gt: dateStart, $lt: dateEnd } })
    .sort({ _id: 1 })
    .lean()
    .exec()
}
