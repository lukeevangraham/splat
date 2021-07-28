const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  column1Ids: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
  column2Ids: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
  column3Ids: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
