const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  organizedBy: {
    type: String,
    required: true,
    trim: true,
  },
  nameOfPerson: {
    type: String,
    required: true,
    trim: true,
  },
  story: {
    type: String,
    required: true,
    trim: true,
  },
  donationGoal: {
    type: Number,
    required: true,
  },
  numberOfDonors: {
    type: Number,
    default: 0, 
  },
  amountRaised: {
    type: Number,
    default: 0,
  },
  images: [{
    type: String, 
    trim: true,
  }],
  accountDetails: {
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
    },
    upiId: {
      type: String,
      trim: true,
      default: '',
    },
  },
    videoLink: {
      type: String,
      trim: true,
      default: "",
    },
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;