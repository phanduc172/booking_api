module.exports = app => {
    const customer = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    router.post("/", customer.create);

    router.get("/", customer.getAll);

    router.get("/:id", customer.findOne);

    router.put("/:id", customer.update);

    router.delete("/:id", customer.delete);

    app.use('/api/customer', router);
};
