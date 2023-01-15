//Model
import {UserModel} from "../models/user";
import {ProductModel} from "../models/newproduct";

export class AdminController {
    //Admin
    static async getAdmin(req, res, next) {
        const count = 0;
        UserModel.find().then(user => {
            const data = user.filter(i => i.productNewOrder.order.length > 0);
            for (let i = 0; i < data.length; i++) {
                const js = JSON.parse(JSON.stringify(data[i].productNewOrder.order));
                console.log("data", js[0].sum);
            }
            res.render("admin/adminmanager", {
                path: "/admin",
                count: count,
                listusers: user,
                listorders: data,
                Manager : null
            })
        });
    }


    //Manager Users
    static async getManagerUsers(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        UserModel.find().then(user => {
            const data = user.filter(i => i.productNewOrder.order.length > 0);
            res.render("admin/list-user", {
                path: "/admin/list-user",
                count: count,
                listusers: user,
                Manager : null
            })
        });
    }

    //Update USer
    static async getUpdate(req, res, next) {
        const userID = req.params._id;
        console.log("TCL: ", userID);
        UserModel.findById(userID)
            .then(function (user) {
                if (!user) {
                    return res.redicter("/admin");
                }
                res.render("admin/updateusers", {
                    user: user,
                    alo: console.log(user.username),
                    Manager : null
                });
            })
    }

    static async postUpdateUser(req, res, next) {
        const userID = req.body._id;
        const username = req.body.username;
        const age = req.body.age;
        const phone = req.body.phone;
        const role = req.body.role;
        const email = req.body.email;
        const address = req.body.address;
        const created = req.body.created;
        console.log("TCL: ", req.body._id);
        console.log("TCL: ", username);
        UserModel.findById(userID)
            .then(function (user) {
                user.username = username;
                user.age = age;
                user.phone = phone;
                user.role = role;
                user.email = email;
                user.address = address;
                user.created = created;
                return user.save();
            })
            .then(function (result) {
                console.log("Complete Updated Completed user!");
                res.redirect("/admin")
            })
    }

    //Remove
    static async getRemoveUser(req, res, next) {
        const userID = req.params._id;
        console.log("ALOALO: " + userID);
        UserModel.deleteOne({
            _id: userID
        })
            .then(function (result) {
                console.log("Complete Delete Completed user!");
                res.redirect("/admin/managerusers");
            })
    }

    /*List Order*/
    static async getListOrder(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        UserModel.find()
            .then(user => {
                const data = user.filter(i => i.productNewOrder.order.length > 0);
                res.render("admin/list-order", {
                    path: "/admin/list-order",
                    count: count,
                    listorder: data,
                    Manager : null
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    static async postListOrder(req, res, next) {
        req.session.isManager = false;
        const {year} = req.body;
        console.log("TCL: year", year)

        const count = 0;
        UserModel.find()
            .then(user => {
                const data = user.filter(i => i.productNewOrder.order.length > 0);
                //Filter Order Year
                var data2 = data.filter(i => i.productNewOrder.createdOrder.indexOf(year) > 0)
                //console.log("TCL: data2", data2)
                res.render("admin/list-order", {
                    path: "/admin/list-order",
                    yearorder: year,
                    count: count,
                    listorder: data2,
                    Manager : null
                });
            })
    }

    /* New DB*/
    static async getListNewProduct(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        ProductModel.find()
            .then(products => {
                res.render("admin/list-product", {
                    path: "/admin/list-product",
                    count: count,
                    kind: 'allproducts',
                    listproducts: products,
                    Manager : null
                });
            })
    }

    //List iPhone
    static async getListiPhone(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        ProductModel.find()
            .then(products => {
                const data = products.filter(i => i.category == "iPhone");
                console.log(data);
                res.render("admin/list-product", {
                    path: "/admin/list-product",
                    count: count,
                    kind: 'iphone',
                    listproducts: data,
                    Manager : null
                });
            })
    }

    //-------------------------------------------------------------------
    //List Macbook
    static async getListMacbook(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        ProductModel.find()
            .then(products => {
                const data = products.filter(i => i.category == "Macbook");
                console.log(data);
                res.render("admin/list-product", {
                    path: "/admin/list-product",
                    count: count,
                    kind: 'macbook',
                    listproducts: data,
                    Manager : null
                });
            })
    }

    //-------------------------------------------------------------------
    //List Apple Watch
    static async getListAppleWatch(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        ProductModel.find()
            .then(products => {
                var data = products.filter(i => i.category == "AppleWatch");
                console.log(data);
                res.render("admin/list-product", {
                    path: "/admin/list-product",
                    count: count,
                    kind: 'applewatch',
                    listproducts: data,
                    Manager : null
                });
            })
    }

    //-------------------------------------------------------------------
    //List Airpod
    static async getListAirpod(req, res, next) {
        req.session.isManager = false;
        const count = 0;
        ProductModel.find()
            .then(products => {
                const data = products.filter(i => i.category == "AirPods");
                console.log('alo ', data);
                res.render("admin/list-product", {
                    path: "/admin/list-product",
                    count: count,
                    kind: 'airpods',
                    listproducts: data,
                    Manager : null
                });
            })
    }

    static async getRemoveNewProduct(req, res, next) {
        const newproductID = req.params._id;
        console.log("Product ID: " + newproductID);
        req.session.isManager = false;
        ProductModel.deleteOne({
            _id: newproductID
        })
            .then(function (result) {
                console.log("Complete Delete Product!");
                res.redirect('/admin/managerproducts')
            })
    }

    static async getUpdateNewProduct(req, res, next) {
        const newproductID = req.params._id;
        console.log("TCL: ", newproductID);
        ProductModel.findById(newproductID)
            .then(function (newproduct) {
                if (!newproduct) {
                    return res.redicter("/admin");
                }
                res.render("admin/update-product", {
                    airpods: newproduct,
                    alo: console.log(newproduct.productName),
                    Manager : null
                });
            })
    }

    static async postUpdateNewProduct(req, res, next) {
        const newproductID = req.body._id;
        const newproductname = req.body.productname;
        const imagePath = req.body.imagePath;
        const description = req.body.description;
        const price = req.body.price;
        const category = req.body.category;
        const quantity = req.body.quantity;
        const created = req.body.created;
        console.log("TCL: ", newproductID);
        ProductModel.findById(newproductID)
            .then(function (newproduct) {
                newproduct.productName = newproductname;
                newproduct.imagePath = imagePath;
                newproduct.description = description;
                newproduct.price = price;
                newproduct.quantity = quantity;
                newproduct.category = category;
                newproduct.created = created;
                return newproduct.save();
            })
            .then(function (result) {
                console.log("Complete Updated Completed Product!");
                res.redirect("/admin/managerproducts");
            })
    }

    /*






















      //Khoong dung forEach duoc
      getManagerUsersTest: function(req,res,next){
          mongoClient.connect('mongodb+srv://admin:admin@web-nodejs-zrtjg.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, function(err, db) {
              if (err) throw err;

              //Important Connect Data

              UserModel.find(function (err,data) {

              })

              db.close();
          });

      },


      postTest: function(req,res,next){
          //https://smartjob.vn/node-js-va-mongodb-huong-dan-ket-noi/
      }
      */
};
