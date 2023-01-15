import {Router} from "express";

const htmlRouter = Router();

import cors from 'cors'
import {HtmlController} from "../controllers/htmlcontroller";
htmlRouter.use(cors());
htmlRouter.get('/', HtmlController.homepage);
htmlRouter.get('/contact', HtmlController.contact);
htmlRouter.get('/blog', HtmlController.blog);
htmlRouter.get('/about', HtmlController.about);
htmlRouter.get('/applewatch', HtmlController.applewatch);
htmlRouter.get('/iphone', HtmlController.iphone);
htmlRouter.get('/macbook', HtmlController.macbook);
htmlRouter.get('/airpod', HtmlController.airpods);
htmlRouter.get('/allproducts', HtmlController.allproducts);


export default htmlRouter;
