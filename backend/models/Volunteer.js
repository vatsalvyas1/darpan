const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true},
  interests: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
