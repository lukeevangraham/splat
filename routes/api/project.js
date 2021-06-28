const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches with "/project"
router.route("/").post(projectController.post).get(projectController.get);

module.exports = router;
