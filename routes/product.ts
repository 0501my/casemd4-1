
import {Router} from "express";
const productRouter = Router()
// import bodyParser from "body-parser";
import cors from 'cors'
import {checkAuthAdmin} from "../middleware/is-auth-admin";
import {Product} from "../controllers/product";



productRouter.use(cors())



//New Product

export default productRouter;
