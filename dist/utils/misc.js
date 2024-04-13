"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDailyPorcentualForAscOrDescPrice = exports.getVariationSPY = exports.generateTextTweetForAscOrDescPrice = void 0;
const SpyValues_1 = require("../repository/SpyValues");
const parser_1 = require("./parser");
const generateTextTweetForAscOrDescPrice = (actualValue, pastValue) => {
    if (pastValue > actualValue) {
        return `🤒🤒🤒 El valor del cedear SPY500 baja a ${(0, parser_1.moneyParse)(actualValue)} ARS`;
    }
    else {
        return `💸💸💸 El valor del cedear SPY500 sube a ${(0, parser_1.moneyParse)(actualValue)} ARS`;
    }
};
exports.generateTextTweetForAscOrDescPrice = generateTextTweetForAscOrDescPrice;
const getVariationSPY = () => __awaiter(void 0, void 0, void 0, function* () {
    const firstValueOfDay = yield (0, SpyValues_1.getFirtsSpyValue)();
    const lastValueOfDay = yield (0, SpyValues_1.getLastSpyValue)();
    if (lastValueOfDay === null)
        return 0;
    return (((lastValueOfDay.value - firstValueOfDay.value) / firstValueOfDay.value) * 100).toFixed(2);
});
exports.getVariationSPY = getVariationSPY;
const generateDailyPorcentualForAscOrDescPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    const variation = yield (0, exports.getVariationSPY)();
    const { value } = yield (0, SpyValues_1.getLastSpyValue)();
    if (variation > 0) {
        return `El valor del cedear SPY500 subio un ${variation} % y cerro con un valor del ${(0, parser_1.moneyParse)(value)} ARS`;
    }
    else if (variation == 0.0) {
        return `El valor del cedear SPY500 mantuvo su valor y cerro con un valor del ${(0, parser_1.moneyParse)(value)} ARS`;
    }
    else {
        return `El valor del cedear SPY500 descendio un ${variation * -1} % y cerro con un valor del ${(0, parser_1.moneyParse)(value)} ARS`;
    }
});
exports.generateDailyPorcentualForAscOrDescPrice = generateDailyPorcentualForAscOrDescPrice;
