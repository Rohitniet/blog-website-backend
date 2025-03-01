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
exports.userroute = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("./validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.userroute = express_1.default.Router();
dotenv_1.default.config();
const jwt_secret = process.env.jwt_secret;
exports.userroute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = yield validation_1.signup_zod.parse(req.body);
        const email = validated.email;
        const password = validated.password;
        const username = validated.username;
        console.log(password);
        const hashpass = yield bcrypt_1.default.hash(password, 5);
        console.log(hashpass);
        yield db_1.user_model.create({
            email,
            password: hashpass,
            username
        });
        res.json({
            "message": "you have signed up"
        });
    }
    catch (e) {
        res.json({
            "error": e
        });
    }
}));
//@ts-ignore will going to handel it later
exports.userroute.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validated = validation_1.signin_zod.parse(req.body);
    const email = validated.email;
    const password = validated.password;
    try {
        const user = yield db_1.user_model.findOne({
            email
        });
        if (!user) {
            return res.json({
                "message": "user not found"
            });
        }
        if (!user.password) {
            return;
        }
        const security = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!security) {
            res.json({
                "message": "incorrect password"
            });
        }
        const id = user._id;
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ id }, jwt_secret);
        res.json({
            "token": token
        });
    }
    catch (e) {
    }
}));
