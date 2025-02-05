const express = require("express");
const { upload } = require("../middlewares/multerMiddleware");
const { createDonation, getAllDonations, getDonationById } = require("../controllers/donationController");

const router = express.Router();

// Donation creation route
router.post("/", upload.array("images", 5), createDonation);

// Get all donations route
router.get("/", getAllDonations);

// get donation by id route
router.get("/:id", getDonationById);

module.exports = router;
