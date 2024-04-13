"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moneyParse = void 0;
const moneyParse = (money, currency = 'ARP') => {
    const formatter = new Intl.NumberFormat('es-AR', {
        currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
    return formatter.format(money);
};
exports.moneyParse = moneyParse;
