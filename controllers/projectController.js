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
};
