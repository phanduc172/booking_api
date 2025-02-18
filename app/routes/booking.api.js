module.exports = app => {
    const bookings = require("../controllers/booking.controller.js");

    var router = require("express").Router();

    // Tạo booking mới
    router.post("/", bookings.create);

    // Lấy danh sách tất cả booking
    router.get("/", bookings.getAll);

    // Lấy thông tin booking theo ID
    router.get("/:id", bookings.findOne);

    // Cập nhật booking theo ID
    router.put("/:id", bookings.update);

    // Xóa booking theo ID
    router.delete("/:id", bookings.delete);

    app.use('/api/bookings', router);
};
