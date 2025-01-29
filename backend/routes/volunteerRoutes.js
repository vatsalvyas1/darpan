const express = require("express");
const { setupVolunteer } = require("../controllers/volunteerController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/setup", ensureAuthenticated, setupVolunteer);

module.exports = router;
