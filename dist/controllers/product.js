"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const newproduct_1 = require("../models/newproduct");
const user_1 = require("../models/user");
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
class Product {
    static async getAddProduct(req, res, next) {
        let message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        req.session.isManager = false;
        res.render("product/addproduct", {
            errorMessageProduct: message
        });
    }
    static async postAddProduct(req, res, next) {
        const { productname, price, imagePath, description, quantity, category } = req.body;
        const today = new Date();
        const date_format = new Date(today).toDateString();
        const created = date_format;
        console.log(created);
        newproduct_1.ProductModel.findOne({
            imagePath: imagePath
        })
            .then(function (product) {
            if (product) {
                return res.render("product/addproduct", {
                    errorMessageProduct: console.log("PRoduct is Exists"),
                    productt: null
                });
            }
            if (productname == "" ||
                price == "" ||
                imagePath == "" ||
                description == "") {
                return res.render("product/addproduct", {
                    path: "/signup",
                    errorMessageProduct: "Product name or Price or Imagepath or Description is Empty",
                    error: console.log("Empty")
                });
            }
            else {
                const newproductData = new newproduct_1.ProductModel({
                    productname: productname,
                    imagePath: imagePath,
                    price: price,
                    description: description,
                    quantity: quantity,
                    category: category,
                    created: created
                });
                newproductData
                    .save()
                    .then(function (product) {
                    console.log(product);
                });
            }
        })
            .then(function (result) {
            res.redirect("/adminTin");
        })
            .catch(function (err) {
            res.send("error: " + err);
        });
    }
    static async getProductDetail(req, res, next) {
        const productId = req.params._id;
        console.log("TCL: productId", productId);
        user_1.UserModel.find()
            .then(users => {
            newproduct_1.ProductModel.findById(productId)
                .then((productdetail) => {
                res.render("product/product-detail", {
                    product: productdetail
                });
            })
                .catch(err => {
                console.log(err);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map