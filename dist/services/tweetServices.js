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
exports.createDailyTweet = exports.createTweet = void 0;
const SpyValues_1 = require("../repository/SpyValues");
const misc_1 = require("../utils/misc");
const spyServices_1 = require("./spyServices");
const twitterConnect_1 = require("./twitterConnect");
const createTweet = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastValue = yield (0, spyServices_1.getSPYvalue)();
        const { value } = yield (0, SpyValues_1.getLastSpyValue)();
        if (value != lastValue) {
            yield (0, SpyValues_1.saveNewSpyValue)(lastValue);
            yield twitterConnect_1.twitterClient.v2.tweet((0, misc_1.generateTextTweetForAscOrDescPrice)(lastValue, value));
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.createTweet = createTweet;
const createDailyTweet = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield twitterConnect_1.twitterClient.v2.tweet(yield (0, misc_1.generateDailyPorcentualForAscOrDescPrice)());
    }
    catch (e) {
        console.log(e);
    }
});
exports.createDailyTweet = createDailyTweet;
