const mongoose = require("mongoose");
const Donation = require("../models/Donation");

const createDonation = async (req, res) => {
  try {
    // Ensure user is authenticated and has an NGO role
    if (!req.user || req.user.role !== "NGO") {
      return res.status(403).json({ message: "Only NGOs can create donations." });
    }

    const ngoId = req.user._id; 
    const { title, organizedBy, nameOfPerson, story, donationGoal, images, accountDetails, videoLink } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image." });
    }

    if (
      !accountDetails ||
      !accountDetails.accountHolderName ||
      !accountDetails.bankName ||
      !accountDetails.accountNumber ||
      !accountDetails.ifscCode
    ) {
      return res.status(400).json({ message: "All account details are required." });
    }

    const newDonation = new Donation({
      ngoId,  // Automatically assigned from logged-in user
      title,
      organizedBy,
      nameOfPerson,
      story,
      donationGoal,
      images,
      videoLink: videoLink || "",
      accountDetails: {
        accountHolderName: accountDetails.accountHolderName,
        bankName: accountDetails.bankName,
        accountNumber: accountDetails.accountNumber,
        ifscCode: accountDetails.ifscCode,
        upiId: accountDetails.upiId || "",
      },
    });

    await newDonation.save();
    res.status(201).json({ message: "Donation created successfully!", donation: newDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating donation" });
  }
};
  
const getAllDonations = async (req, res) => {
    try {
      const donations = await Donation.find();
      res.status(200).json(donations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching donations" });
    }
  };
  
  const getDonationById = async (req, res) => {
    try {
      const donation = await Donation.findById(req.params.id);
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      res.status(200).json(donation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching donation details" });
    }
  };
  

  const getDonationbyNgoId = async (req, res) => {
    try {
      let { ngoId } = req.params;
      ngoId = ngoId.trim();
  
      console.log("Received ngoId:", ngoId);
  
      const isValidObjectId = mongoose.Types.ObjectId.isValid(ngoId);
      console.log("Is valid ObjectId:", isValidObjectId);
  
      if (!isValidObjectId) {
        return res.status(400).json({ message: `Invalid NGO ID format: ${ngoId}` });
      }
  
      // Check if ngoId is stored as ObjectId or String in DB
      const donations = await Donation.find({ ngoId: new mongoose.Types.ObjectId(ngoId) });
  
      if (!donations || donations.length === 0) {
        return res.status(404).json({ message: "No donations found for this NGO." });
      }
  
      res.status(200).json(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ message: "Error fetching donations" });
    }
  };
  
  module.exports = { createDonation, getAllDonations, getDonationById, getDonationbyNgoId };
  