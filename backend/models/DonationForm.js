const mongoose = require("mongoose");

const donationFormSchema = new mongoose.Schema({
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation", 
    required: true,
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  donationAmount: {
    type: Number,
    required: true,
    default: 500, 
    min: [10, "Donation amount must be at least ₹10"], 
  },
  tipAmount: {
    type: Number,
    default: function () {
      return this.donationAmount * 0.04; // 4% of donation amount
    },
  },
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  billingAddress: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  panNumber: {
    type: String,
    trim: true, // Required only if tax exemption is needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DonationForm = mongoose.model("DonationForm", donationFormSchema);

module.exports = DonationForm;