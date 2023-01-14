//Nếu chưa Login thì trở về trang đăng nhập
export const checkAuth = async (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}
