import mongoose from 'mongoose'

const EventsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  beginDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
})

EventsSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('Events', EventsSchema);
