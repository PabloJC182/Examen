module.exports = app => {
  const membresia = require("../controllers/membresia.controller.js");
  var router = require("express").Router();

  router.post("/create/", membresia.create);
  router.get("/", membresia.findAll);
  router.get("/status", membresia.findAllStatus);
  router.get("/:carnet", membresia.findOne);
  router.put("/update/:carnet", membresia.update);
  router.delete("/delete/:carnet", membresia.delete);
  router.delete("/delete/", membresia.deleteAll);

  app.use("/api/membresia", router);
};