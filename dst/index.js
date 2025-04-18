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
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const common_1 = require("./common");
dotenv_1.default.config();
const db_string = process.env.db;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", user_1.userroute);
app.use("/common", common_1.commonroute);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db_string) {
            return;
        }
        const connection = yield mongoose_1.default.connect("mongodb+srv://admin:zHj0B48rwT9ykOqc@admin1.as6ck.mongodb.net/blog");
        if (connection) {
            console.log("db is connected");
        }
        app.listen(3000);
    });
}
start();
