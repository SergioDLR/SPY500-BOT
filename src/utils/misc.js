export const generateTextTweetForAscOrDescPrice = (actualValue, pastValue) => {
  if (pastValue > actualValue) {
    return `🤒🤒🤒 El valor del cedear SPY500 baja a ${actualValue} ARS`
  } else {
    return `💸💸💸 El valor del cedear SPY500 sube a ${actualValue} ARS`
  }
}
