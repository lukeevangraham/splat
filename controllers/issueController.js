const db = require("../models");

module.exports = {
    post: async (req, res) => {
      try {
        const dbIssue = await db.Issue.create(req.body);
        const dbProject = await db.Project.findByIdAndUpdate(req.body.projectId, { $push: {  issues: dbIssue._id} }, { new: true }).populate("issues")
        res.json(dbProject);
      } catch (e) {
        console.log("[issueController]: ", e);
      }
    },
}