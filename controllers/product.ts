import bodyParser from "body-parser";
//Model

import {ProductModel} from "../models/newproduct";
import {UserModel} from "../models/user";

const urlencodedParser = bodyParser.urlencoded({extended: false});

export class Product {
    /* NEW DB*/
    static async getAddProduct(req, res, next) {
        let message = req.flash("error");
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        req.session.isManager = false;
        res.render("product/addproduct", {
            errorMessageProduct: message
        });
    }

    static async postAddProduct(req, res, next) {
        const {
            productname,
            price,
            imagePath,
            description,
            quantity,
            category
        } = req.body;
        const today = new Date();
        const date_format = new Date(today).toDateString();
        const created = date_format;
        console.log(created);
        ProductModel.findOne({
            imagePath: imagePath
        })

            .then(function (product) {
                if (product) {
                    return res.render("product/addproduct", {
                        errorMessageProduct: console.log("PRoduct is Exists"),
                        productt: null
                    });
                }
                if (
                    productname == "" ||
                    price == "" ||
                    imagePath == "" ||
                    description == ""
                ) {
                    return res.render("product/addproduct", {
                        path: "/signup",
                        errorMessageProduct:
                            "Product name or Price or Imagepath or Description is Empty",
                        error: console.log("Empty")
                    });
                } else {
                    const newproductData = new ProductModel({
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
        console.log("TCL: productId", productId)
        UserModel.find()
            .then(users => {
                ProductModel.findById(productId)
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
