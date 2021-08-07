const db = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      // Noting which column the issue should be associated with
      const colString = `column${req.body.column.slice(-1)}Ids`;

      const dbIssue = await db.Issue.create(req.body.issueData);
      const dbProject = await db.Project.findByIdAndUpdate(
        req.body.issueData.projectId,
        { $push: { [colString]: dbIssue._id } },
        { new: true }
      ).populate("column1Ids").populate("column2Ids").populate("column3Ids");;
      res.json(dbProject);
    } catch (e) {
      console.log("[issueController]: ", e);
    }
  },
  update: async (req, res) => {
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
