const express = require("express");
const { setupNgo } = require("../controllers/ngoController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

// Middleware to ensure the user is logged in
router.post("/setup", ensureAuthenticated, setupNgo);

module.exports = router;
