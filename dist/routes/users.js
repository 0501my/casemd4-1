"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const cors_1 = __importDefault(require("cors"));
const is_auth_1 = require("../middleware/is-auth");
const user_1 = require("../controllers/user");
userRouter.use((0, cors_1.default)());
userRouter.get("/signup", user_1.User.getSignUp);
userRouter.post("/signup", user_1.User.postSignUp);
userRouter.get("/login", user_1.User.getLogin);
userRouter.post("/login", user_1.User.postLogin);
userRouter.post("/logout", user_1.User.postLogout);
userRouter.get("/account/:_id", is_auth_1.checkAuth, user_1.User.getAccount);
userRouter.post("/account", is_auth_1.checkAuth, user_1.User.postEditUser);
userRouter.get("/cart", is_auth_1.checkAuth, user_1.User.getCartPage);
userRouter.get("/api/cart", is_auth_1.checkAuth, user_1.User.getCart);
userRouter.post("/cart", is_auth_1.checkAuth, user_1.User.postCart);
userRouter.post("/removecartproduct", is_auth_1.checkAuth, user_1.User.postRemoveProductCart);
userRouter.post("/updatecart", is_auth_1.checkAuth, user_1.User.postUpdateCart);
exports.default = userRouter;
//# sourceMappingURL=users.js.map