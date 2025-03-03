module.exports = app => {
    const service = require("../controllers/service.controller.js");

    var router = require("express").Router();

    router.post("/", service.create);

    router.get("/", service.getAll);

    router.get("/:id", service.findOne);

    router.put("/:id", service.update);

    router.delete("/:id", service.delete);

    app.use('/api/service', router);
};
