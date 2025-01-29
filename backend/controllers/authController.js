const User = require("../models/User");

// Find or create user in the database
async function findOrCreateUser(profile) {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    });
  }

  return user;
}

// Update user role
async function setUserRole(userId, role) {
  const validRoles = ["NGO", "Volunteer", "Donor"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
}

module.exports = {
  findOrCreateUser,
  setUserRole,
};
