"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
mongoose_1.default.set('strictQuery', true);
require('dotenv').config();
const users_1 = __importDefault(require("./routes/users"));
const admin_1 = __importDefault(require("./routes/admin"));
const product_1 = __importDefault(require("./routes/product"));
const port = process.env.port || 3000;
const MONGODB_URI = 'mongodb+srv://admin:admin@web-nodejs-zrtjg.mongodb.net/case?retryWrites=true&w=majority';
mongoose_1.default.connect(MONGODB_URI).then(() => console.log('DB connect'))
    .catch(err => console.log('DB Err', err.message));
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: 'tingodlike',
    resave: false,
    saveUninitialized: false,
}));
app.use('/images', express_1.default.static('images'));
app.use((0, connect_flash_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(users_1.default);
app.use(admin_1.default);
app.use(product_1.default);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(function (req, res, next) {
    const err = new Error('123 123 Not found!');
    next(err);
});
(0, routes_1.default)(app);
app.listen(port, function () {
    console.log('Server is running http://localhost:3000');
});
module.exports = app;
//# sourceMappingURL=index.js.map