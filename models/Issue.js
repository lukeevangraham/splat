const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  summary: {
    type: String,
    trim: true,
    required: "Summary is required",
  },
  author: String,
  description: String,
  status: {
    type: String,
  },
  priority: Number,
  teammates: Array,
  dateSubmitted: {
    type: Date,
    defulat: Date.now,
  },
  lastUpdated: {
    type: Date,
    defulat: Date.now,
  },
  notes: Array,
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;
