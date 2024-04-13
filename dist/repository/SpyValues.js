import dayjs from 'dayjs';
import SpyValuesScheme from '../Schemas/SpyValues.js';
import { getSPYvalue } from '../services/spyServices.js';
export const saveSpyValue = async () => {
    return SpyValuesScheme.create({ value: await getSPYvalue(), date: dayjs() });
};
export const getLastSpyValue = async () => {
    const result = await SpyValuesScheme.findOne().sort({ date: -1 }).limit(1).lean().exec();
    if (result)
        return { value: result.value ?? 0, date: result.date ?? '' };
    return { value: 0, date: '' };
};
export const saveNewSpyValue = async (newValue) => {
    return SpyValuesScheme.create({ value: newValue, date: dayjs() });
};
export const getFirtsSpyValue = async () => {
    const yesterdayAt12Date = dayjs().subtract(1, 'day').startOf('day');
    return SpyValuesScheme.findOne({ date: { $gt: yesterdayAt12Date } })
        .sort({ _id: 1 })
        .limit(1)
        .lean()
        .exec();
};
export const getSPYValuesInDates = async (dateStart, dateEnd) => {
    return await SpyValuesScheme.find({ date: { $gt: dateStart, $lt: dateEnd } })
        .sort({ _id: 1 })
        .lean()
        .exec();
};
