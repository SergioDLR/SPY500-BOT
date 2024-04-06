import SpyValuesScheme from '../Schemas/SpyValues.js'
import { getSPYvalue } from '../services/spyServices.js'
export const saveSpyValue = async () => {
  return SpyValuesScheme.create({ value: await getSPYvalue() })
}

export const getLastSpyValue = async () => {
  return SpyValuesScheme.find().sort({ _id: -1 }).limit(1).exec()[0]
}

export const saveNewSpyValue = async (newValue) => {
  return SpyValuesScheme.create({ value: newValue })
}
