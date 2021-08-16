const db = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      const dbProject = await db.Project.create(req.body);
      res.json(dbProject);
    } catch (e) {
      alert(e);
    }
  },
  get: async (req, res) => {
    try {
      const dbProject = await db.Project.find();
      res.json(dbProject);
    } catch (e) {
      alert(e);
    }
  },
  findOne: async (req, res) => {
    try {
      const dbProject = await db.Project.findOne({
        _id: req.params.id,
      })
        .populate("column1Ids")
        .populate("column2Ids")
        .populate("column3Ids");
      res.json(dbProject);
    } catch (e) {
      console.log("[projController]", e);
    }
  },
  put: async (req, res) => {
    try {
      // if this is related to renaming a project
      if (req.body.name) {
        const dbProject = await db.Project.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $set: {
              name: req.body.project.name,
            },
          },
          { new: true }
        );
        res.json(dbProject);
        return;
      }

      // determine if this a move between DND Columns
      if (req.body.newStart) {
        const dbProject = await db.Project.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $set: {
              [`column${req.body.newStart.id.substr(-1)}Ids`]:
                req.body.newStart.issueIds,
              [`column${req.body.newFinish.id.substr(-1)}Ids`]:
                req.body.newFinish.issueIds,
            },
          },
          { new: true }
        );
        res.json(dbProject);

        return;
      }

      // this must be a move within the same column
      const dbProject = await db.Project.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { [`column${req.body.id.substr(-1)}Ids`]: req.body.issueIds } },
        { new: true }
      );
      res.json(dbProject);
    } catch (e) {
      console.log("[projController]: ", e);
    }
  },
};
