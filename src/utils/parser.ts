export const moneyParse = (money: number, currency = 'ARP') => {
  const formatter = new Intl.NumberFormat('es-AR', {
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
  return formatter.format(money)
}
