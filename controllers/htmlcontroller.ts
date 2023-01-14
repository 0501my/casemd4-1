import bodyParser from "body-parser";
import {ProductModel} from "../models/newproduct";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
export class HtmlController{
  static async homepage(req, res, next) {
    req.session.isManager = false;

    ProductModel.find()
      .then(products => {
          const dataiPhone = products.filter(i => i.category == "iPhone");
          const dataMacbook = products.filter(i => i.category == "Macbook");
          const dataAppleWatch = products.filter(i => i.category == "AppleWatch");
          const dataAirpods = products.filter(i => i.category == "AirPods");
          res.render("homepage", {
          listproducts: dataiPhone,
          listmacbooks: dataMacbook,
          listapplewatch: dataAppleWatch,
          listairpod: dataAirpods
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static async contact (req, res, next) {
    res.render("general/contact", {
    });
  }
    static async getAbout(req, res, next) {
      res.render("general/about", {
      });
    };

static async blog(req, res, next) {
    res.render("general/blog", {
    });
  };

  //iPhone
static async iphone(req, res, next) {
      req.session.isManager = false;
      ProductModel.find()
        .then(products => {
            const data = products.filter(i => i.category == "iPhone");
            res.render("product/page-product", {
              kind: 'iphone',
              listproducts: data
            });
        })
        .catch(err => {
          console.log(err);
        });
  };

  //Macbook
  static async macbook (req, res, next) {
    req.session.isManager = false;
    ProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "Macbook");
        res.render("product/page-product", {
          kind: 'macbook',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Apple Watch
  static async applewatch(req, res, next) {
    req.session.isManager = false;
    ProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AppleWatch");
        res.render("product/page-product", {
          kind: 'applewatch',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //airpods
   static async airpods(req, res, next) {
    req.session.isManager = false;
    ProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AirPods");
        res.render("product/page-product", {
          kind: 'airpods',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };




  //allproduct
   static async allproducts(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    ProductModel.find()
      .then(products => {
        res.render("product/page-product", {
          kind: 'allproducts',
          listproducts: products
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}



