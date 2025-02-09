const express = require("express");
const { upload } = require("../middlewares/multerMiddleware");
const { createEvent, getAllEvents, getEventById, getEventbyNgoId } = require("../controllers/eventController");

const router = express.Router();

// Event creation route
router.post("/", upload.array("images", 5), createEvent);

// Get all events route
router.get("/", getAllEvents);

// get event by id route
router.get("/:id", getEventById);

// get event by ngoId route
router.get("/ngo/:ngoId", getEventbyNgoId);

module.exports = router;