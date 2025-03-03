module.exports = app => {
    const room = require("../controllers/room.controller.js");

    var router = require("express").Router();

    router.post("/", room.create);

    router.get("/", room.getAll);

    router.get("/:id", room.findOne);

    router.put("/:id", room.update);

    router.delete("/:id", room.delete);

    app.use('/api/room', router);
};
