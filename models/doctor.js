const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  location: { type: String, required: true },
  specialty: { type: String, required: true },
  experiences: [{ type: String, required: true }],
  educations: [{ type: String, required: true }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  doctorsConnection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;