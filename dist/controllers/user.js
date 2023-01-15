"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const url_1 = __importDefault(require("url"));
const user_1 = require("../models/user");
const newproduct_1 = require("../models/newproduct");
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
class User {
    static async getSignUp(req, res, next) {
        let message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render("user/signup", {
            path: "/signup",
            pageTitle: "signup",
            errorMessage: message,
            userr: null,
            isAuthenticated: null
        });
    }
    static async postSignUp(req, res, next) {
        const { username, password, email, age, phone, address, confirmpassword } = req.body;
        const today = new Date();
        const date_format = new Date(today).toDateString();
        const created = date_format;
        user_1.UserModel.findOne({
            username: username
        })
            .then(function (user) {
            if (user) {
                return res.render("user/signup", {
                    path: "/signup",
                    errorMessage: "Username exists already~!",
                    error: console.log("Already"),
                    user: null
                });
            }
            if (username == "" || password == "") {
                return res.render("user/signup", {
                    path: "/signup",
                    errorMessage: "Invalid Username or Password",
                    error: console.log("Invalid")
                });
            }
            if (password != confirmpassword) {
                return res.render("user/signup", {
                    path: "/signup",
                    errorMessage: "Password and Confirmpassword not same",
                    error: console.log("Not same")
                });
            }
            return bcryptjs_1.default
                .hash(password, 12)
                .then(function (hashpassword) {
                const userData = new user_1.UserModel({
                    username: username,
                    password: hashpassword,
                    email: email,
                    age: age,
                    phone: phone,
                    address: address,
                    created: created
                });
                return userData.save();
            })
                .then(function (result) {
                res.redirect("/login");
            });
        })
            .catch(function (err) {
            res.send("error: " + err);
        });
    }
    static async getLogin(req, res, next) {
        console.log("TCL: process.env.SECRETKEY_TOKEN", process.env.SECRETKEY_TOKEN);
        let message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render("user/login", {
            path: "/login",
            pageTitle: "Login",
            errorMessage: message,
            userr: null,
            isAuthenticated: false
        });
    }
    static async postLogin(req, res, next) {
        user_1.UserModel.findOne({
            username: req.body.username
        }).then(function (user) {
            if (!user) {
                return res.render("user/login", {
                    path: "/login",
                    errorMessage: "Username or password wrong",
                    userr: null,
                    isAuthenticated: false
                });
            }
            if (req.body.username === "" || req.body.password == "") {
                return res.render("user/login", {
                    path: "/login",
                    errorMessage: "Invailid username or password",
                    userr: null,
                    isAuthenticated: false
                });
            }
            bcryptjs_1.default.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    if (user.role === "admin") {
                        const token = jsonwebtoken_1.default.sign({
                            email: user.email,
                            userID: user._id,
                            role: user.role
                        }, process.env.SECRETKEY_TOKEN || 'Dai');
                        req.session.token = token;
                        req.session.role = user.role;
                        return req.session.save(err => {
                            res.redirect("/admin");
                        });
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({
                            email: user.email,
                            userID: user._id,
                            role: user.role
                        }, process.env.SECRETKEY_TOKEN || 'Dai');
                        req.session.token = token;
                        req.session.role = user.role;
                        console.log(user);
                        return req.session.save(err => {
                            res.redirect(url_1.default.format({
                                pathname: "/home"
                            }));
                        });
                    }
                }
                else {
                    return res.render("user/login", {
                        path: "/login",
                        errorMessage: "Invailid username or password",
                        userr: null,
                        isAuthenticated: false
                    });
                }
            });
        });
    }
    static async postLogout(req, res, next) {
        req.session.destroy(err => {
            console.log(err);
            res.redirect("/user/logout");
        });
    }
    static async getAccount(req, res, next) {
        res.render("user/account", {});
    }
    static async postEditUser(req, res, next) {
        const userID = req.body._id;
        const age = req.body.age;
        const phone = req.body.phone;
        console.log("TCL: ", userID);
        user_1.UserModel.findById(userID)
            .then(function (user) {
            if (!user) {
                res.render("/login");
            }
            if (req.body.age == "" || req.body.phone == "") {
                return res.render("user/login", {
                    path: "/login",
                    errorMessage: "Age or Phone is Empty",
                    userr: null,
                    isAuthenticated: false
                });
            }
            user.age = age;
            user.phone = phone;
            console.log(user);
            return user.save();
        })
            .then(function (result) {
            console.log("Complete Updated Completed user!");
            req.session.isLoggedIn = false;
            return res.redirect("/");
        })
            .catch(function (err) {
            console.log("TCL: ", err);
        });
    }
    static async getCartPage(req, res, next) {
        let message = req.flash("errorMessage");
        let boolError = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        if (boolError.length > 0) {
            boolError = 'true';
        }
        else {
            boolError = 'false';
        }
        user_1.UserModel.findById(req.session.user._id)
            .then(user => {
            user.populate("cart.items.productId")
                .then(user => {
                let products = user.cart.items;
                console.log(products);
                res.render("product/page-cart", {
                    path: "/cart",
                    pageTitle: "Your Cart",
                    products: products,
                    sum: user.cart.sum,
                    errorMessage: message,
                    error: boolError,
                    isAuthenticated: false
                });
            });
        })
            .catch(err => console.log(err));
    }
    static async getCart(req, res, next) {
        user_1.UserModel.findById(req.session.user._id)
            .then(user => {
            user.populate("cart.items.productId")
                .then(user1 => {
                console.log("TCL: user.cart.sum", user1.cart.sum);
                res.json({
                    "sumPrice": user.cart.sum,
                    "products": user.cart.items
                });
            });
        })
            .catch(err => console.log(err));
    }
    static async postCart(req, res, next) {
        console.log("Add Product to Cart");
        const productId = req.body.productId;
        console.log("TCL: productId", productId);
        var newQuantity = req.body.productNumber;
        console.log("TCL: newQuantity", newQuantity);
        newproduct_1.ProductModel.findById(productId)
            .then(product => {
            user_1.UserModel.findById(req.session.user._id);
        })
            .then(result => {
            res.redirect("/");
        });
    }
    static async postRemoveProductCart(req, res, next) {
        const productID = req.body.productId;
        console.log("TCL: productID", productID);
        user_1.UserModel.findById(req.session.user._id)
            .then(user => {
            newproduct_1.ProductModel.findById(productID);
        })
            .then(result => {
            res.redirect("/");
        })
            .catch(err => console.log(err));
    }
    static async postUpdateCart(req, res, next) {
        const { productQuantity, productId, btnUpdateCart, btnCheckOut, name, mobilenumber, address } = req.body;
        console.log("TCL: btnCheckOut", btnCheckOut);
        console.log("TCL: btnUpdateCart", btnUpdateCart);
        let newQuantityArr = [];
        let productIdArr = [];
        const newUpdateItems = [];
        if (typeof productId == 'string') {
            newQuantityArr = productQuantity.split(",");
            productIdArr = productId.split(",");
        }
        else {
            newQuantityArr = productQuantity;
            productIdArr = productId;
        }
        console.log("TCL: newQuantityArr", newQuantityArr);
        console.log("TCL: productIdArr", productIdArr);
        user_1.UserModel.findById(req.session.user._id);
    }
}
exports.User = User;
;
//# sourceMappingURL=user.js.map