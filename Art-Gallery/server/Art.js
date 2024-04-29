// Art.js
const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  artName: {
    type: String,
    required: true,
  },
  artType: {
    type: String,
    required: true,
  },
  artCost: {
    type: Number,
    required: true,
  },
  contactDetails: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // You can use String to store image URLs
    required: true, // Set this to false if image is optional
  },
  // You can include additional fields as needed
});

module.exports = mongoose.model('Art', artSchema);
