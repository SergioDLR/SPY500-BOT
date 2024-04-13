"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviroment = void 0;
const node_process_1 = __importDefault(require("node:process"));
exports.enviroment = {
    appKey: node_process_1.default.env.API_KEY,
    appSecret: node_process_1.default.env.API_SECRET,
    accessToken: node_process_1.default.env.ACCESS_TOKEN,
    accessSecret: node_process_1.default.env.ACCESS_SECRET,
    port: node_process_1.default.env.PORT,
    mongoConnectionString: (_a = node_process_1.default.env.MONGO_CONNECT) !== null && _a !== void 0 ? _a : ''
};
