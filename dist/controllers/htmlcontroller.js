"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlController = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const newproduct_1 = require("../models/newproduct");
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
class HtmlController {
    static async homepage(req, res, next) {
        req.session.isManager = false;
        console.log(11);
        newproduct_1.ProductModel.find()
            .then(products => {
            const dataiPhone = products.filter(i => i.category == "iPhone");
            const dataMacbook = products.filter(i => i.category == "Macbook");
            const dataAppleWatch = products.filter(i => i.category == "AppleWatch");
            const dataAirpods = products.filter(i => i.category == "AirPods");
            res.render("homepage", {
                listproducts: dataiPhone,
                listmacbooks: dataMacbook,
                listapplewatch: dataAppleWatch,
                listairpod: dataAirpods,
                isAuthenticated: false,
                Manager: null
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    static async contact(req, res, next) {
        res.render("general/contact", {
            isAuthenticated: false,
            Manager: null
        });
    }
    static async about(req, res, next) {
        res.render("general/about", { isAuthenticated: false,
            Manager: null
        });
    }
    ;
    static async blog(req, res, next) {
        res.render("general/blog", {
            isAuthenticated: false,
            Manager: null
        });
    }
    ;
    static async iphone(req, res, next) {
        req.session.isManager = false;
        newproduct_1.ProductModel.find()
            .then(products => {
            const data = products.filter(i => i.category == "iPhone");
            res.render("product/page-product", {
                kind: 'iphone',
                listproducts: data,
                isAuthenticated: false,
                Manager: null
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    ;
    static async macbook(req, res, next) {
        req.session.isManager = false;
        newproduct_1.ProductModel.find()
            .then(products => {
            var data = products.filter(i => i.category == "Macbook");
            res.render("product/page-product", {
                kind: 'macbook',
                listproducts: data,
                isAuthenticated: false,
                Manager: null
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    ;
    static async applewatch(req, res, next) {
        req.session.isManager = false;
        newproduct_1.ProductModel.find()
            .then(products => {
            var data = products.filter(i => i.category == "AppleWatch");
            res.render("product/page-product", {
                kind: 'applewatch',
                listproducts: data,
                isAuthenticated: false,
                Manager: null
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    ;
    static async airpods(req, res, next) {
        req.session.isManager = false;
        newproduct_1.ProductModel.find()
            .then(products => {
            var data = products.filter(i => i.category == "AirPods");
            res.render("product/page-product", {
                kind: 'airpods',
                listproducts: data,
                isAuthenticated: false,
                Manager: null
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    ;
    static async allproducts(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        newproduct_1.ProductModel.find()
            .then(products => {
            res.render("product/page-product", {
                kind: 'allproducts',
                listproducts: products,
                isAuthenticated: false,
                Manager: null
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    ;
}
exports.HtmlController = HtmlController;
//# sourceMappingURL=htmlcontroller.js.map