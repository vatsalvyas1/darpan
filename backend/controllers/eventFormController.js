const EventForm = require("../models/EventForm");

const submitEventForm = async (req, res) => {
  try {
    const { eventId, volunteerId, name, age, mobileNumber, gender, experience, skills } = req.body;

    if (!eventId || !volunteerId || !name || !age || !mobileNumber || !gender) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const newEventForm = new EventForm({
      eventId,
      volunteerId,
      name,
      age,
      mobileNumber,
      gender,
      experience,
      skills,
    });

    await newEventForm.save();
    res.status(201).json({ message: "Event participation confirmed!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Fetch all event forms
const getEventForms = async (req, res) => {
  try {
    const eventForms = await EventForm.find().populate("eventId volunteerId", "title name email");
    res.json(eventForms);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Fetch event forms by event ID
const getFormsByEventId = async (req, res) => {
  try {
    const { id } = req.params;
    const eventForms = await EventForm.find({ eventId: id }).populate("volunteerId", "name email");
    if (!eventForms.length) {
      return res.status(404).json({ error: "No forms found for this event" });
    }
    res.json(eventForms);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Check if a volunteer is already registered for an event
const checkVolunteerRegistration = async (req, res) => {
    try {
      const { eventId, volunteerId } = req.params;
      const existingRegistration = await EventForm.findOne({ eventId, volunteerId });
  
      res.json({ isRegistered: !!existingRegistration });
    } catch (error) {
      console.error("Error checking registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = { submitEventForm, getEventForms, getFormsByEventId, checkVolunteerRegistration };
