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
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("./config");
process.on("uncaughtException", (err) => {
    console.error(`Uncaught exception: ${err.name}, ${err.message}`);
    console.error("🤔 App is shutting down...");
    process.exit(1);
});
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./services/mongo");
const server = https_1.default.createServer({
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "key.pem")),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "cert.pem")),
}, app_1.default);
const PORT = config_1.config.PORT;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongo_1.mongoConnect)();
        server.listen(PORT, () => {
            console.log(`✔ Server is listening on port: ${PORT} in ${process.env.NODE_ENV} environment.`);
        });
    }
    catch (err) {
        console.error(`🤔 There was an error starting the server ${err}`);
    }
}))();
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled rejection: ${err.name} ${err.message}`);
    console.error("🤔 App is shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
