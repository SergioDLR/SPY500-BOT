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
exports.cronScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const consts_1 = require("../utils/consts");
const tweetServices_1 = require("./tweetServices");
const cronScheduler = () => {
    node_cron_1.default.schedule(consts_1.CRON_TIME_SCHEDULE, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, tweetServices_1.createTweet)();
    }));
    node_cron_1.default.schedule(consts_1.CRON_DAILY_TIME_SCHEDULE, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, tweetServices_1.createDailyTweet)();
    }));
    console.log('Cron started');
};
exports.cronScheduler = cronScheduler;
