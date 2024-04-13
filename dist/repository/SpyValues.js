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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSPYValuesInDates = exports.getFirtsSpyValue = exports.saveNewSpyValue = exports.getLastSpyValue = exports.saveSpyValue = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const SpyValues_1 = __importDefault(require("../Schemas/SpyValues"));
const spyServices_1 = require("../services/spyServices");
const saveSpyValue = () => __awaiter(void 0, void 0, void 0, function* () {
    return SpyValues_1.default.create({ value: yield (0, spyServices_1.getSPYvalue)(), date: (0, dayjs_1.default)() });
});
exports.saveSpyValue = saveSpyValue;
const getLastSpyValue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield SpyValues_1.default.findOne().sort({ date: -1 }).limit(1).lean().exec();
    if (result)
        return { value: (_a = result.value) !== null && _a !== void 0 ? _a : 0, date: (_b = result.date) !== null && _b !== void 0 ? _b : '' };
    return { value: 0, date: '' };
});
exports.getLastSpyValue = getLastSpyValue;
const saveNewSpyValue = (newValue) => __awaiter(void 0, void 0, void 0, function* () {
    return SpyValues_1.default.create({ value: newValue, date: (0, dayjs_1.default)() });
});
exports.saveNewSpyValue = saveNewSpyValue;
const getFirtsSpyValue = () => __awaiter(void 0, void 0, void 0, function* () {
    const yesterdayAt12Date = (0, dayjs_1.default)().subtract(1, 'day').startOf('day');
    return SpyValues_1.default.findOne({ date: { $gt: yesterdayAt12Date } })
        .sort({ _id: 1 })
        .limit(1)
        .lean()
        .exec();
});
exports.getFirtsSpyValue = getFirtsSpyValue;
const getSPYValuesInDates = (dateStart, dateEnd) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SpyValues_1.default.find({ date: { $gt: dateStart, $lt: dateEnd } })
        .sort({ _id: 1 })
        .lean()
        .exec();
});
exports.getSPYValuesInDates = getSPYValuesInDates;
