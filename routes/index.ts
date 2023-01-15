import adminRouter from "./admin";
import productRouter from "./product";
import userRouter from "./users";
import htmlRouter from './html'
function router(app){
    app.use('/admin',adminRouter);
    app.use('/product',productRouter);
    app.use('/user',userRouter);
    app.use('/home',htmlRouter)
}
export default router;
