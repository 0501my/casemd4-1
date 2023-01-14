import express from "express";
import {Router} from "express";
const productRouter = Router()
// import bodyParser from "body-parser";
import cors from 'cors'
import {checkAuthAdmin} from "../middleware/is-auth-admin";
import {Product} from "../controllers/product";



productRouter.use(cors())



//New Product
productRouter.get('/addproduct',checkAuthAdmin, Product.getAddProduct)
productRouter.post('/addproduct',checkAuthAdmin, Product.postAddProduct)

productRouter.get('/product/:_id',Product.getProductDetail)

export default productRouter;
