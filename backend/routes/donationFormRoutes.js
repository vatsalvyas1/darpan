const express = require("express");
const { submitDonation, getDonationDetails, checkDonorRegistration } = require("../controllers/donationFormController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for submitting donation form
router.post("/", ensureAuthenticated, submitDonation);

// Route for fetching donation details
router.get("/:id", ensureAuthenticated, getDonationDetails);


router.post("/:donationId", ensureAuthenticated, submitDonation);

router.get("/check-registration/:donationId/:donorId", ensureAuthenticated, checkDonorRegistration);


module.exports = router;
