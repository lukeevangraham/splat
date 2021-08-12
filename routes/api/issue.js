const router = require("express").Router();
const projectController = require("../../controllers/projectController");
const issueController = require("../../controllers/issueController");

// Matches with "/project"
router.route("/").post(issueController.post);
router
  .route("/:id")
  .put(issueController.update)
  .delete(issueController.delete);
// router.route("/").post(projectController.post).get(projectController.get);
// router.route("/:id").get(projectController.findOne)

module.exports = router;
