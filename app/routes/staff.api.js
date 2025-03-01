module.exports = app => {
    const staffs = require("../controllers/staff.controller.js");

    var router = require("express").Router();

    router.post("/", staffs.create);

    router.get("/", staffs.getAll);

    router.get("/:id", staffs.findOne);

    router.put("/:id", staffs.update);

    router.delete("/:id", staffs.delete);

    app.use('/api/staffs', router);
};
