const Volunteer = require("../models/Volunteer");

const setupVolunteer = async (req, res) => {
  try {
    const { name, age, interests } = req.body;

    if (!name || !age) {
      return res.status(400).json({ success: false, error: "Name and age are required." });
    }
    const userId = req.user._id;

    // Check if a Volunteer is already associated with this user
    const existingVolunteer = await Volunteer.findOne({ userId });
    if (existingVolunteer) {
      return res.status(400).json({ success: false, error: "Volunteer is already set up for this user." });
    }

    // Create and save the Volunteer
    const volunteer = new Volunteer({
      userId,
      name,
      age,
      email: req.user.email,
      interests,
    });

    await volunteer.save();
    res.status(200).json({ success: true, message: "Volunteer setup completed." });
  } catch (error) {
    console.error("Error setting up Volunteer:", error.message);
    res.status(500).json({ success: false, error: "Failed to set up Volunteer." });
  }
};

module.exports = { setupVolunteer };
