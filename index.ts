import express from 'express';

const app = express();
import router from "./routes";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import flash from 'connect-flash';

import bodyParser from "body-parser";
import session from 'express-session';

import passport from 'passport';
mongoose.set('strictQuery', true);
require('dotenv').config()

//Router
import userRouter from './routes/users';
import routesAdmin from './routes/admin';
import routesProduct from './routes/product';


const port = process.env.port || 3000;


const MONGODB_URI =
    'mongodb://127.0.0.1:27017/shop';

mongoose.connect(
    MONGODB_URI
).then(()=> console.log('DB connect'))
    .catch(err => console.log('DB Err',err.message))

//App use
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

//- Dùng session để duy trì đăng nhập và để sử dụng flash
app.use(
    session({
        secret: 'tingodlike',
        resave: false, // session sẽ ko lưu với mỗi lệnh request => tốc đô
        saveUninitialized: false, // chắc chắn ko có session đc save mỗi request
    }))

app.use('/images', express.static('images'));

//- Dùng để đưa thông tin message 
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// app.use((req, res, next) => {
//     // gui ve 1 bien trong moi 1 route
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     res.locals.Manager = req.session.isManager;
//     res.locals.currentUser = req.session.user;
//     res.locals.session = req.session;
//     next();
// });


//Routes
app.use(userRouter);
app.use(routesAdmin);
app.use(routesProduct);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');


//-404 Error

router(app);

app.listen(port, function () {
    console.log('Server is running http://localhost:3000')
})
