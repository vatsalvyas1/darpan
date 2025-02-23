const DonationForm = require("../models/DonationForm");
const User = require("../models/User");
const Donation = require("../models/Donation");

const submitDonation = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== "Donor") {
      return res.status(403).json({ message: "Only donors can make donations." });
    }

    const {
      donationAmount,
      tipAmount,
      donorName,
      mobileNumber,
      email,
      billingAddress,
      pincode,
      panNumber,
    } = req.body;

    const donationId = req.params.donationId;

    // Ensure the donation campaign exists
    const donationCampaign = await Donation.findById(donationId);
    if (!donationCampaign) {
      return res.status(404).json({ message: "Donation campaign not found." });
    }

    // Save new donation entry
    const newDonation = new DonationForm({
      donationId,
      donorId: user._id,
      donationAmount,
      tipAmount,
      donorName,
      mobileNumber,
      email,
      billingAddress,
      pincode,
      panNumber,
    });

    await newDonation.save();

    // Check if donor exists in the campaign's donor list
    const isNewDonor = !donationCampaign.donors.some(donor => donor.equals(user._id));

    // Update amountRaised and numberOfDonors
    donationCampaign.amountRaised += donationAmount;
    if (isNewDonor) {
      donationCampaign.numberOfDonors += 1;
      donationCampaign.donors.push(user._id); // Add donor only if new
    }

    await donationCampaign.save();

    res.status(201).json({ 
      success: true, 
      message: `Thank you for donating ₹${donationAmount}! Your support is appreciated.` 
    });
  } catch (error) {
    console.error("Error submitting donation form:", error);
    res.status(500).json({ error: "Failed to process donation." });
  }
};

const getDonationDetails = async (req, res) => {
  try {
    const donation = await DonationForm.findById(req.params.id).populate("donorId", "name email");
    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation not found" });
    }

    res.status(200).json({ success: true, donation });
  } catch (error) {
    console.error("Error fetching donation details:", error);
    res.status(500).json({ success: false, message: "Failed to fetch donation details" });
  }
};

const checkDonorRegistration = async (req, res) => {
  try {
    const { donationId, donorId } = req.params;
    const existingRegistration = await DonationForm.findOne({ donationId, donorId });

    if (existingRegistration) {
      return res.json({ isRegistered: true, donationAmount: existingRegistration.donationAmount });
    }

    res.json({ isRegistered: false });
  } catch (error) {
    console.error("Error checking donation:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllDonationForms = async (req, res) => {
  try {
    const donations = await DonationForm.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching all donations:", error);
    res.status(500).json({ message: "Failed to fetch donations." });
  }
};

const getDonationsByDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donations = await DonationForm.find({ donorId }).populate("donationId", "title");
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donor's donations:", error);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};

module.exports = { submitDonation, getDonationDetails, checkDonorRegistration, getAllDonationForms, getDonationsByDonor };
