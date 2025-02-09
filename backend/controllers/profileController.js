const User = require("../models/User");
const NGO = require("../models/NGO");
const Volunteer = require("../models/Volunteer");
const Donor = require("../models/Donor");
const Donation = require("../models/Donation");
const Event = require("../models/Event");
const mongoose = require("mongoose");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password").lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    let profileData = { user };

    if (user.role === "NGO") {
      const ngoProfile = await NGO.findOne({ userId }).lean();
      if (ngoProfile) {
        // Fetch donations and events using userId instead of ngoProfile._id
        const donations = await Donation.find({ ngoId: userId }).lean();
        const events = await Event.find({ ngoId: userId }).lean();

        ngoProfile.donations = donations;
        ngoProfile.events = events;
        profileData.ngo = ngoProfile;
      }
    } else if (user.role === "Volunteer") {
      const volunteerProfile = await Volunteer.findOne({ userId }).lean();
      if (volunteerProfile) profileData.volunteer = volunteerProfile;
    } else if (user.role === "Donor") {
      const donorProfile = await Donor.findOne({ userId }).lean();
      if (donorProfile) profileData.donor = donorProfile;
    }

    res.json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};