module.exports = app => {
    const staff = require("../controllers/staff.controller.js");

    var router = require("express").Router();

    router.post("/", staff.create);

    router.get("/", staff.getAll);

    router.get("/:id", staff.findOne);

    router.put("/:id", staff.update);

    router.delete("/:id", staff.delete);

    app.use('/api/staff', router);
};
