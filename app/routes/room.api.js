module.exports = app => {
    const rooms = require("../controllers/room.controller.js");

    var router = require("express").Router();

    // Tạo phòng mới
    router.post("/", rooms.create);

    // Lấy danh sách tất cả phòng
    router.get("/", rooms.getAll);

    // // Lấy thông tin phòng theo ID
    router.get("/:id", rooms.findOne);

    // // Cập nhật phòng theo ID
    router.put("/:id", rooms.update);

    // // Xóa phòng theo ID
    router.delete("/:id", rooms.delete);

    app.use('/api/rooms', router);
};
