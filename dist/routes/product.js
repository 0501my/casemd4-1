"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter = (0, express_1.Router)();
const cors_1 = __importDefault(require("cors"));
const is_auth_admin_1 = require("../middleware/is-auth-admin");
const product_1 = require("../controllers/product");
productRouter.use((0, cors_1.default)());
productRouter.get('/addproduct', is_auth_admin_1.checkAuthAdmin, product_1.Product.getAddProduct);
productRouter.post('/addproduct', is_auth_admin_1.checkAuthAdmin, product_1.Product.postAddProduct);
productRouter.get('/product/:_id', product_1.Product.getProductDetail);
exports.default = productRouter;
//# sourceMappingURL=product.js.map