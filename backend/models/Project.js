const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  deadline: Date,
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
