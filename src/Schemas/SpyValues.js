import { Schema, model } from 'mongoose'

const SpyValues = new Schema({
  value: { type: Number, require: true },
  date: { type: Date, require: true }
})

export default model('SpyValues', SpyValues)
