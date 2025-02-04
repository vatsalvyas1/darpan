const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true },
  preferredCauses: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donor", donorSchema);
