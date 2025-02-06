const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.get("/", ensureAuthenticated, getProfile);

module.exports = router;
