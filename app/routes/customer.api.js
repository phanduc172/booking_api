module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // Tạo khách hàng mới
    router.post("/", customers.create);

    // Lấy danh sách tất cả khách hàng
    router.get("/", customers.getAll);

    // Lấy thông tin khách hàng theo ID
    router.get("/:id", customers.findOne);

    // Cập nhật khách hàng theo ID
    router.put("/:id", customers.update);

    // Xóa khách hàng theo ID
    router.delete("/:id", customers.delete);

    app.use('/api/customers', router);
};
