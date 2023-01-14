import express from "express";
import {Router} from "express";

const adminRouter = Router();

import cors from 'cors'
import {AdminController} from "../controllers/admin";
import {checkAuthAdmin} from "../middleware/is-auth-admin";
import {checkAuth} from "../middleware/is-auth";

adminRouter.use(cors());

adminRouter.get("/", checkAuth, checkAuthAdmin, AdminController.getAdmin);

//Manager User
adminRouter.get("/managerusers", checkAuth, checkAuthAdmin, AdminController.getManagerUsers);
adminRouter.get("/managerusers/update/:_id", checkAuth, checkAuthAdmin, AdminController.getUpdate);
adminRouter.post("/managerusers/update", checkAuth, checkAuthAdmin, AdminController.postUpdateUser);
adminRouter.get("/managerusers/delete/:_id", checkAuth, checkAuthAdmin, AdminController.getRemoveUser);

//Manager Order
adminRouter.get("/managerorder", checkAuth, checkAuthAdmin, AdminController.getListOrder);
adminRouter.post("/managerorder", checkAuth, checkAuthAdmin, AdminController.postListOrder);


//Manager iPhone
adminRouter.get("/managerproducts", checkAuth, checkAuthAdmin, AdminController.getListNewProduct);

//Manager iPhone
adminRouter.get("/manageriphone", checkAuth, checkAuthAdmin, AdminController.getListiPhone);

//Manager Macbook
adminRouter.get("/managermacbook", checkAuth, checkAuthAdmin, AdminController.getListMacbook);

//Manager Apple Watch

adminRouter.get("/managerapplewatch", checkAuthAdmin, AdminController.getListAppleWatch);

//Manager Airpod
adminRouter.get("/managerairpod", checkAuthAdmin, AdminController.getListAirpod);

//Manager NewProduct
adminRouter.get("/managernewproduct", checkAuthAdmin, AdminController.getListNewProduct);
adminRouter.get(
    "/managerproducts/delete/:_id", checkAuthAdmin,
    AdminController.getRemoveNewProduct
);
adminRouter.get(
    "/managerproducts/update/:_id", checkAuthAdmin,
    AdminController.getUpdateNewProduct
);
adminRouter.post(
    "/managerproducts/update", checkAuthAdmin,
    AdminController.postUpdateNewProduct
);
export default adminRouter;
