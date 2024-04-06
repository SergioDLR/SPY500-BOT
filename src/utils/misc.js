import { moneyParse } from './parser.js'
export const generateTextTweetForAscOrDescPrice = (actualValue, pastValue) => {
  if (pastValue > actualValue) {
    return `🤒🤒🤒 El valor del cedear SPY500 baja a ${moneyParse(actualValue)} ARS`
  } else {
    return `💸💸💸 El valor del cedear SPY500 sube a ${moneyParse(actualValue)} ARS`
  }
}
