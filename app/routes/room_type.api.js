module.exports = app => {
    const roomtype = require("../controllers/room_type.controller.js");

    var router = require("express").Router();

    router.post("/", roomtype.create);

    router.get("/", roomtype.getAll);

    router.get("/:id", roomtype.findOne);

    router.put("/:id", roomtype.update);

    router.delete("/:id", roomtype.delete);

    app.use('/api/roomtype', router);
};
