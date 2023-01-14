import adminRouter from "./admin";
import productRouter from "./product";
import userRouter from "./users";
function router(app){
    app.use('/admin',adminRouter);
    app.use('/product',productRouter);
    app.use('/user',userRouter)
}
export default router;
