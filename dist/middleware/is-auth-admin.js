"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthAdmin = void 0;
const checkAuthAdmin = async (req, res, next) => {
    if (req.session.role == "customer") {
        return res.redirect("/");
    }
    next();
};
exports.checkAuthAdmin = checkAuthAdmin;
//# sourceMappingURL=is-auth-admin.js.map