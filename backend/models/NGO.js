const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
  registrationNumber: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  causesSupported: { type: [String], default: [] },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("NGO", ngoSchema);
