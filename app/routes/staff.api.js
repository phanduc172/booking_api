module.exports = app => {
    const staffs = require("../controllers/staff.controller.js");

    var router = require("express").Router();

    // Tạo khách hàng mới
    router.post("/", staffs.create);

    // Lấy danh sách tất cả khách hàng
    router.get("/", staffs.getAll);

    // Lấy thông tin khách hàng theo ID
    router.get("/:id", staffs.findOne);

    // Cập nhật khách hàng theo ID
    router.put("/:id", staffs.update);

    // Xóa khách hàng theo ID
    router.delete("/:id", staffs.delete);

    app.use('/api/staffs', router);
};
