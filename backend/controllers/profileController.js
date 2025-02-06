const User = require("../models/User");
const NGO = require("../models/NGO");
const Volunteer = require("../models/Volunteer");
const Donor = require("../models/Donor");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let profileData = { user };

    if (user.role === "NGO") {
      const ngoProfile = await NGO.findOne({ userId });
      if (ngoProfile) profileData.ngo = ngoProfile;
    } else if (user.role === "Volunteer") {
      const volunteerProfile = await Volunteer.findOne({ userId });
      if (volunteerProfile) profileData.volunteer = volunteerProfile;
    } else if (user.role === "Donor") {
      const donorProfile = await Donor.findOne({ userId });
      if (donorProfile) profileData.donor = donorProfile;
    }

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
