const express = require("express");
const { setupDonor } = require("../controllers/donorController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/setup", ensureAuthenticated, setupDonor);

module.exports = router;
