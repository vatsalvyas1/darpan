const express = require("express");
const passport = require("passport");
const { setUserRole } = require("../controllers/authController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Google OAuth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      if (req.user && req.user.firstLogin) {
        return res.redirect("/select-role");
      }

      // Store user ID in session
      req.session.userId = req.user._id; 

      // Redirect based on role
      switch (req.user.role) {
        case "NGO":
          return res.redirect(`${process.env.FRONTEND_URL}`);
        case "Volunteer":
          return res.redirect(`${process.env.FRONTEND_URL}`);
        case "Donor":
          return res.redirect(`${process.env.FRONTEND_URL}`);
        default:
          return res.redirect(`${process.env.FRONTEND_URL}`);
      }
    } catch (err) {
      console.error("Error during login callback:", err);
      res.status(500).send("An error occurred during authentication.");
    }
  }
);

router.get("/me", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password"); // Exclude sensitive fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});


// Render role selection page
router.get("/select-role", ensureAuthenticated, (req, res) => {
  res.send(`
    <h1>Select Your Role</h1>
    <form action="/select-role" method="POST">
      <button type="submit" name="role" value="NGO">NGO</button>
      <button type="submit" name="role" value="Volunteer">Volunteer</button>
      <button type="submit" name="role" value="Donor">Donor</button>
    </form>
  `);
});

// Handle role selection
router.post("/select-role", ensureAuthenticated, async (req, res) => {
  const { role } = req.body;

  try {
    if (!["NGO", "Volunteer", "Donor"].includes(role)) {
      return res.status(400).send("Invalid role selection");
    }

    // Update user role and mark first login as complete
    await setUserRole(req.user._id, role);
    req.user.firstLogin = false;

    // Redirect to role-specific setup page
    switch (role) {
      case "NGO":
        return res.redirect(`${process.env.FRONTEND_URL}/ngo/setup`);
      case "Volunteer":
        return res.redirect(`${process.env.FRONTEND_URL}/volunteer/setup`);
      case "Donor":
        return res.redirect(`${process.env.FRONTEND_URL}/donor/setup`);
      default:
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
  } catch (err) {
    console.error("Error setting user role:", err);
    res.status(500).send("Failed to set role. Please try again.");
  }
});

// Check authentication status
router.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true, user: req.user });
  }
  res.status(200).json({ isAuthenticated: false });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ error: "Failed to destroy session" });
      }
      res.clearCookie("connect.sid"); // Adjust the cookie name if needed
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
