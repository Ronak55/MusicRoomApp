const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  price: Number,
  duration: String,
  instructor: String,
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
