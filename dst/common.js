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
exports.commonroute = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
exports.commonroute = express_1.default.Router();
exports.commonroute.post('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const index = req.body.page || 1;
    const limit = 8;
    const skip = (index - 1) * limit;
    try {
        const blogs = yield db_1.blog_model.find().populate("userid").skip(skip).limit(8);
        res.json({
            "blogs": blogs
        });
    }
    catch (e) {
        res.json({
            message: "error in reciving the blogs"
        });
    }
}));
