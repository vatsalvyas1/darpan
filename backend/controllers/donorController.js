const Donor = require("../models/Donor");
const User = require("../models/User");

const setupDonor = async (req, res) => {
  try {
    const { name, preferredCauses } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: "Name is required." });
    }

    // Use the logged-in user's ID
    const userId = req.user._id;

    // Check if a Donor is already associated with this user
    const existingDonor = await Donor.findOne({ userId });
    if (existingDonor) {
      return res.status(400).json({ success: false, error: "Donor is already set up for this user." });
    }

    // Create and save the Donor
    const donor = new Donor({
      userId,
      name,
      email: req.user.email,
      preferredCauses,
    });

    await donor.save();

    // Update the user's firstLogin flag to false
    await User.findByIdAndUpdate(userId, { firstLogin: false });

    res.status(200).json({ success: true, message: "Donor setup completed." });
  } catch (error) {
    console.error("Error setting up Donor:", error.message);
    res.status(500).json({ success: false, error: "Failed to set up Donor." });
  }
};

module.exports = { setupDonor };
