module.exports = app => {
    const facility = require("../controllers/facility.controller.js");

    var router = require("express").Router();

    router.post("/", facility.create);

    router.get("/", facility.getAll);

    router.get("/:id", facility.findOne);

    router.put("/:id/update", facility.update);

    router.delete("/:id", facility.delete);

    app.use('/api/facility', router);
};
