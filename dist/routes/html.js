"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const htmlRouter = (0, express_1.Router)();
const cors_1 = __importDefault(require("cors"));
const htmlcontroller_1 = require("../controllers/htmlcontroller");
htmlRouter.use((0, cors_1.default)());
htmlRouter.get('/', htmlcontroller_1.HtmlController.homepage);
htmlRouter.get('/contact', htmlcontroller_1.HtmlController.contact);
htmlRouter.get('/blog', htmlcontroller_1.HtmlController.blog);
htmlRouter.get('/about', htmlcontroller_1.HtmlController.about);
htmlRouter.get('/applewatch', htmlcontroller_1.HtmlController.applewatch);
htmlRouter.get('/iphone', htmlcontroller_1.HtmlController.iphone);
htmlRouter.get('/macbook', htmlcontroller_1.HtmlController.macbook);
htmlRouter.get('/airpod', htmlcontroller_1.HtmlController.airpods);
htmlRouter.get('/allproducts', htmlcontroller_1.HtmlController.allproducts);
exports.default = htmlRouter;
//# sourceMappingURL=html.js.map