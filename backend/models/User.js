const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["NGO", "Volunteer", "Donor"], required: false },
  createdAt: { type: Date, default: Date.now },
  firstLogin: { type: Boolean, default: true }, 
});

module.exports = mongoose.model("User", userSchema);
