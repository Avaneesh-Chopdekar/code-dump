"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DocumentSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("Document", DocumentSchema);
