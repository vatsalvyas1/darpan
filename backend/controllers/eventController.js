const mongoose = require("mongoose");
const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "NGO") {
      return res.status(403).json({ message: "Only NGOs can create events." });
    }

    const { title, organizerName, description, when, locationLink, images, website, opportunity, whyJoinUs, whatsappGroupLink } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image." });
    }

    if (!title || !organizerName || !description || !opportunity || !when?.from || !when?.to) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newEvent = new Event({
      ngoId: req.user._id,
      title,
      organizerName,
      locationLink,
      description,
      website: website || "",
      opportunity,
      when,
      whyJoinUs,
      images,
      whatsappGroupLink: whatsappGroupLink || "",
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully!", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event details" });
  }
};

const getEventbyNgoId = async (req, res) => {
  try {
    let { ngoId } = req.params;
    ngoId = ngoId.trim();

    if (!mongoose.Types.ObjectId.isValid(ngoId)) {
      return res.status(400).json({ message: "Invalid NGO ID format." });
    }

    const events = await Event.find({ ngoId: new mongoose.Types.ObjectId(ngoId) });

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found for this NGO." });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = { createEvent, getAllEvents, getEventById, getEventbyNgoId };
