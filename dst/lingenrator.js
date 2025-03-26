"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkgenerator = linkgenerator;
function linkgenerator() {
    let link = "";
    const arr = ["a", "s", "d", "q", "z", "f", "e", "t", "g", "r", "b", "h", "k", "o", "p", "u"];
    for (let i = 0; i < 10; i++) {
        link = link + arr[Math.floor(Math.random() * 10)];
    }
    return link;
}
