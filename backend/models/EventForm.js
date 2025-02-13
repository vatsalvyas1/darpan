const mongoose = require('mongoose');

const eventFormSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  mobileNumber: { type: String, required: true, trim: true },
  experience: { type: String, trim: true },
  skills: { type: String, trim: true },
}, {
  timestamps: true,
});

const EventForm = mongoose.model('EventForm', eventFormSchema);

module.exports = EventForm;