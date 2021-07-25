const db = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      const dbIssue = await db.Issue.create(req.body);
      const dbProject = await db.Project.findByIdAndUpdate(
        req.body.projectId,
        { $push: { issues: dbIssue._id } },
        { new: true }
      ).populate("issues");
      res.json(dbProject);
    } catch (e) {
      console.log("[issueController]: ", e);
    }
  },
  update: async (req, res) => {
    console.log("updating issue!!", req.params)
    try {
      const dbIssue = await db.Issue.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      res.json(dbIssue);
    } catch (e) {
      console.log("[issueController]: ", e);
    }
  },
};
