const db = require("../models");
const Customer = db.customer;
const { sendResponse } = require("../public/common");

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return sendResponse(res, 400, null, "Vui lòng nhập email và mật khẩu");
            }
            const user = await Customer.findOne({
                where: { email },
            });
            if (!user) {
                return sendResponse(res, 401, null, "Email không tồn tại");
            }
            if (user.password !== password) {
                return sendResponse(res, 401, null, "Mật khẩu không đúng");
            }
            if (user.role !== "Admin") {
                return sendResponse(res, 403, null, "Bạn không có quyền truy cập");
            }
            return sendResponse(
                res,
                200,
                { id: user.id, name: user.name, email: user.email, role: user.role },
                "Đăng nhập thành công"
            );
        } catch (error) {
            console.error("🔥 Lỗi khi đăng nhập:", error);
            return sendResponse(res, 500, null, "Lỗi máy chủ khi đăng nhập", error);
        }
    },
};
