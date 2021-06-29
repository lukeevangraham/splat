const router = require("express").Router();
const projectRoutes = require("./project");
const issueRoutes = require("./issue")

router.use("/project", projectRoutes);
router.use("/issue", issueRoutes);

module.exports = router;
