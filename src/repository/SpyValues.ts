import dayjs from 'dayjs'

import SpyValuesScheme from '../Schemas/SpyValues'
import { getSPYvalue } from '../services/spyServices'
export const saveSpyValue = async () => {
  return SpyValuesScheme.create({ value: await getSPYvalue(), date: dayjs() })
}

export const getLastSpyValue = async (): Promise<{ value: number; date: string | Date }> => {
  const result = await SpyValuesScheme.findOne().sort({ date: -1 }).limit(1).lean().exec()
  if (result) return { value: result.value ?? 0, date: result.date ?? '' }
  return { value: 0, date: '' }
}

export const saveNewSpyValue = async (newValue: number) => {
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

export const getSPYValuesInDates = async (
  dateStart: string,
  dateEnd: string
): Promise<{ value: number; date: string | Date }[]> => {
  try {
    const spyValues = await SpyValuesScheme.find({ date: { $gt: dateStart, $lt: dateEnd } })
      .sort({ _id: 1 })
      .lean()
      .exec()

    const parsedData = spyValues.map((spyValue) => ({ value: spyValue.value ?? 0, date: spyValue.date ?? '' }))
    return parsedData
  } catch {
    return []
  }
}
