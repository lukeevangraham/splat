const db = require("../models");

module.exports = {
    post: async (req, res) => {
      try {
        console.log("[issueontroller] BODY: ", req.body);
        const dbIssue = await db.Issue.create(req.body);
        const dbProject = await db.Project.findOneAndUpdate({ _id: req.body.projectId }, { $push: {  issues: dbIssue._id} }, { new: true })
        res.json(dbProject);
      } catch (e) {
        console.log("[issueController]: ", e);
      }
    },
}