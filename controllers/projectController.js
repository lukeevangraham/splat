const db = require("../models");

module.exports = {
  post: async (req, res) => {
    try {
      console.log("[proectController] BODY: ", req.body);
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
      }).populate("column1Ids").populate("column2Ids").populate("column3Ids");
      console.log("PROJECT: ", dbProject)
      res.json(dbProject);
    } catch (e) {
      console.log("[projController]", e);
    }
  },
};
