module.exports = app => {
    const status = require("../controllers/status.controller.js");

    var router = require("express").Router();

    router.post("/", status.create);

    router.get("/", status.getAll);

    router.get("/:id", status.findOne);

    router.put("/:id", status.update);

    router.delete("/:id", status.delete);

    app.use('/api/status', router);
};
