import { getFirtsSpyValue, getLastSpyValue } from '../repository/SpyValues.js';
import { moneyParse } from './parser.js';
export const generateTextTweetForAscOrDescPrice = (actualValue, pastValue) => {
    if (pastValue > actualValue) {
        return `🤒🤒🤒 El valor del cedear SPY500 baja a ${moneyParse(actualValue)} ARS`;
    }
    else {
        return `💸💸💸 El valor del cedear SPY500 sube a ${moneyParse(actualValue)} ARS`;
    }
};
export const getVariationSPY = async () => {
    try {
        const firstValueOfDay = await getFirtsSpyValue();
        const lastValueOfDay = await getLastSpyValue();
        if (lastValueOfDay === null || firstValueOfDay === null)
            return 0;
        let parsedLastValue = Number(lastValueOfDay.value);
        let parsedFirstValue = Number(firstValueOfDay.value);
        return parseFloat((((parsedLastValue - parsedFirstValue) / parsedFirstValue) * 100).toFixed(2));
    }
    catch {
        return 0;
    }
};
export const generateDailyPorcentualForAscOrDescPrice = async () => {
    const variation = await getVariationSPY();
    const { value } = await getLastSpyValue();
    if (variation > 0) {
        return `El valor del cedear SPY500 subio un ${variation} % y cerro con un valor del ${moneyParse(value)} ARS`;
    }
    else if (variation == 0.0) {
        return `El valor del cedear SPY500 mantuvo su valor y cerro con un valor del ${moneyParse(value)} ARS`;
    }
    else {
        return `El valor del cedear SPY500 descendio un ${variation * -1} % y cerro con un valor del ${moneyParse(value)} ARS`;
    }
};
