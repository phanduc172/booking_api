module.exports = app => {
    const room = require("../controllers/room.controller.js");

    var router = require("express").Router();

    router.post("/", room.create);

    router.get("/", room.getAll);

    router.get("/available", room.getAvailableRooms);

    router.get("/:id", room.findOne);

    router.put("/:id/update", room.update);

    router.delete("/:id", room.delete);

    router.put("/:id/update-status", room.updateStatus);

    app.use('/api/room', router);
};
