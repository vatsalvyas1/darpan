const DonationForm = require("../models/DonationForm");
const User = require("../models/User");

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
    res.status(201).json({ success: true, message: "Donation recorded successfully!" });
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

module.exports = { submitDonation, getDonationDetails, checkDonorRegistration };
