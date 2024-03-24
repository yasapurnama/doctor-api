const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;