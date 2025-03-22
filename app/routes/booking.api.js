module.exports = app => {
    const booking = require("../controllers/booking.controller.js");

    var router = require("express").Router();

    router.post("/", booking.create);

    router.get("/", booking.getAll);

    router.get("/:id", booking.findOne);

    router.put("/:id", booking.update);

    router.delete("/:id", booking.delete);

    router.put("/:id/status", booking.updateStatus);

    app.use('/api/booking', router);
};
