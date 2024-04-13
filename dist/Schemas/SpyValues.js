"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SpyValues = new mongoose_1.Schema({
    value: { type: Number, require: true },
    date: { type: Date, require: true }
});
exports.default = (0, mongoose_1.model)('SpyValues', SpyValues);
