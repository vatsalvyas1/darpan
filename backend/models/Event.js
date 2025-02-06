const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
      },
      organizerName: {
        type: String,
        required: true,
        trim: true,
      },
  locationLink: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
    default: '', 
  },
  opportunity: {
    type: String,
    required: true,
    trim: true,
  },
  when: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  whyJoinUs: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
    trim: true,
  }],
  whatsappGroupLink: {
    type: String,
    trim: true,
    default: '', 
  },
}, {
  timestamps: true, 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;