const router = require("express").Router();
const projectRoutes = require("./project");

router.use("/project", projectRoutes);

module.exports = router;
