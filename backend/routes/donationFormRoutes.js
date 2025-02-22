const express = require("express");
const { submitDonation, getDonationDetails, checkDonorRegistration, getAllDonationForms } = require("../controllers/donationFormController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for submitting donation form
router.post("/", ensureAuthenticated, submitDonation);

// Route for fetching donation details
router.get("/:id", ensureAuthenticated, getDonationDetails);

// Add this route for fetching all donations
router.get("/", getAllDonationForms);

// Route for fetching all donations of a donor
router.post("/:donationId", ensureAuthenticated, submitDonation);

// Route for checking if donor is already registered
router.get("/check-registration/:donationId/:donorId", ensureAuthenticated, checkDonorRegistration);


module.exports = router;
