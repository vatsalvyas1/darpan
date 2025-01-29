const NGO = require("../models/NGO");
const User = require("../models/User");

const setupNgo = async (req, res) => {
  try {
    const { name, registrationNumber, address } = req.body;

    if (!name || !registrationNumber || !address) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    // Use the logged-in user's ID
    const userId = req.user._id;

    // Check if an NGO is already associated with this user
    const existingNgo = await NGO.findOne({ userId });
    if (existingNgo) {
      return res.status(400).json({ success: false, error: "NGO is already set up for this user." });
    }

    // Create and save the NGO
    const ngo = new NGO({
      userId,
      name,
      email: req.user.email,
      registrationNumber,
      address,
    });

    await ngo.save();

    // Update the user's firstLogin flag to false
    await User.findByIdAndUpdate(userId, { firstLogin: false });

    res.status(200).json({ success: true, message: "NGO setup completed." });
  } catch (error) {
    console.error("Error setting up NGO:", error.message);
    res.status(500).json({ success: false, error: "Failed to set up NGO." });
  }
};

module.exports = { setupNgo };
