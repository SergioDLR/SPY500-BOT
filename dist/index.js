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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const enviroment_1 = require("./utils/enviroment");
const spyController_1 = __importDefault(require("./controllers/spyController"));
const tweetController_1 = __importDefault(require("./controllers/tweetController"));
const cronServices_1 = require("./services/cronServices");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const SpyValues_1 = require("./repository/SpyValues");
const nunjucks_1 = __importDefault(require("nunjucks"));
const parser_1 = require("./utils/parser");
const misc_1 = require("./utils/misc");
const dayjs_1 = __importDefault(require("dayjs"));
const app = (0, express_1.default)();
const port = (_a = enviroment_1.enviroment.port) !== null && _a !== void 0 ? _a : 8080;
app.use(express_1.default.static('public'));
nunjucks_1.default.configure(`${__dirname}/views`, {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');
app.listen(port, () => {
    mongoose_1.default.connect(enviroment_1.enviroment.mongoConnectionString).then(() => {
        console.log('Connected to mongo DB');
        (0, cronServices_1.cronScheduler)();
    });
    console.log(`App ready on ${port}`);
});
app.use('/api/v1/spy', spyController_1.default);
app.use('/api/v1/tweet', tweetController_1.default);
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = yield (0, SpyValues_1.getLastSpyValue)();
    const parsed = (0, parser_1.moneyParse)(value);
    const variation = yield (0, misc_1.getVariationSPY)();
    res.render('home', { value: parsed, variation });
}));
app.get('/historicos', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('variation');
}));
app.get('/historicos/withDate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dateFrom, dateTo } = req.query;
    const values = yield (0, SpyValues_1.getSPYValuesInDates)(String(dateFrom !== null && dateFrom !== void 0 ? dateFrom : ''), String(dateTo !== null && dateTo !== void 0 ? dateTo : ''));
    res.render('variationWithDates', {
        values: values.map((value) => ({
            date: (0, dayjs_1.default)(value.date).format('DD/MM/YYYY hh:mm'),
            value: `${(0, parser_1.moneyParse)(value.value)} ARS`
        }))
    });
}));
