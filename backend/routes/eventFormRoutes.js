const express = require("express");
const { submitEventForm, getEventForms, getFormsByEventId, checkVolunteerRegistration } = require("../controllers/eventFormController");
const router = express.Router();

router.post("/", submitEventForm);
router.get("/", getEventForms);
router.get("/:id", getFormsByEventId); 
router.get("/check-registration/:eventId/:volunteerId", checkVolunteerRegistration);

module.exports = router;
