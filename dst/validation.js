"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blog_zod = exports.signin_zod = exports.signup_zod = void 0;
const zod_1 = require("zod");
exports.signup_zod = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
    username: zod_1.z.string().min(3).max(15)
});
exports.signin_zod = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
});
exports.blog_zod = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
