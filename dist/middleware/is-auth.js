"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=is-auth.js.map