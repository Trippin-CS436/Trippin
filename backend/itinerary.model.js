const mongoose = require("mongoose");
const { json } = require("express");

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  itinerary: {
    type: Array,
    required: 'Please enter your name',
    unique: false,
    minlength: 3,
  },
  message: {
      type: String,
      required: 'Please enter a message'
  },
  date: {
      type: Date, 
      default: Date.now
  }
});

const Message = mongoose.model('Message', itinerarySchema);

module.exports = Message;