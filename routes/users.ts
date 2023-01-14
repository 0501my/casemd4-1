import express from "express";
import {Router} from "express";
const userRouter = Router();

import cors from 'cors'
import {checkAuth} from "../middleware/is-auth";
import {User} from "../controllers/user";

userRouter.use(cors());

//Sign Up
userRouter.get("/signup", User.getSignUp);
userRouter.post("/signup", User.postSignUp);

//Login
userRouter.get("/login", User.getLogin);
userRouter.post("/login", User.postLogin);

//Logout
userRouter.post("/logout", User.postLogout);

//Account
userRouter.get("/account/:_id", checkAuth, User.getAccount);
userRouter.post("/account", checkAuth, User.postEditUser);
//router.get('/account/:_id',UserController.getEditUser)

//Cart
userRouter.get("/cart", checkAuth, User.getCartPage);

//-Cart__GetCart
userRouter.get("/api/cart", checkAuth, User.getCart);
//-Cart__AddToCart
userRouter.post("/cart", checkAuth, User.postCart);
//-Cart__Remove
userRouter.post("/removecartproduct", checkAuth, User.postRemoveProductCart);
//-Cart__UpdateCart
//router.post("/cart/update/:_id", isAuth, UserController.postUpdateCart);
userRouter.post("/updatecart", checkAuth, User.postUpdateCart);
export default userRouter;
