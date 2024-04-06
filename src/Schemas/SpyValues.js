import dayjs from 'dayjs'
import { Schema, model } from 'mongoose'

const SpyValues = new Schema({
  value: { type: Number, require: true },
  date: { type: Date, default: dayjs() }
})

export default model('SpyValues', SpyValues)
