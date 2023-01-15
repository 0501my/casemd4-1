"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
const product_1 = __importDefault(require("./product"));
const users_1 = __importDefault(require("./users"));
const html_1 = __importDefault(require("./html"));
function router(app) {
    app.use('/admin', admin_1.default);
    app.use('/product', product_1.default);
    app.use('/user', users_1.default);
    app.use('/home', html_1.default);
}
exports.default = router;
//# sourceMappingURL=index.js.map