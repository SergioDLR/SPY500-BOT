"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterClient = void 0;
const twitter_api_v2_1 = require("twitter-api-v2");
const enviroment_1 = require("../utils/enviroment");
const { appKey, appSecret, accessToken, accessSecret } = enviroment_1.enviroment;
const client = new twitter_api_v2_1.TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret
});
//const bearer = new TwitterApi(process.env.BEARER_TOKEN)
exports.twitterClient = client.readWrite;
