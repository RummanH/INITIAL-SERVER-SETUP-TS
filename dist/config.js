"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    MONGO_URL: process.env.MONGO_URL || "",
    PORT: parseInt(process.env.PORT || "5000"),
};
