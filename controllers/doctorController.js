const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const Review = require('../models/review');

const createDoctorProfile = async (req, res) => {
  try {
    const { firstName, lastName, location, specialty, experiences, educations } = req.body;

    const newDoctor = new Doctor({
      firstName,
      lastName,
      location,
      specialty,
      experiences,
      educations
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor profile created successfully', doctor: newDoctor });
    
  } catch (error) {
    console.error('Error creating doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, location, specialty, experiences, educations } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        location,
        specialty,
        experiences,
        educations,
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    res.status(200).json({ message: 'Doctor profile updated successfully', doctor: updatedDoctor });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    res.status(200).json({ message: 'Doctor profile deleted successfully', doctor: deletedDoctor });
  } catch (error) {
    console.error('Error deleting doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addPatientToDoctorProfile = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    const { firstName, lastName, age } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    const newPatient = new Patient({ firstName, lastName, age });
    await newPatient.save();

    doctor.patients.push(newPatient);
    await doctor.save();

    res.status(200).json({ message: 'Patient added to doctor profile successfully', doctor });
  } catch (error) {
    console.error('Error adding patient to doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPatientsForDoctorProfile = async (req, res) => {
  try {
    const { id: doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId).populate('patients');

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor patients not found' });
    }

    const patients = doctor.patients;

    res.status(200).json({ patients });
  } catch (error) {
    console.error('Error retrieving patients for doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addReviewToDoctorProfile = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    const { patientId, rating, comment } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const newReview = new Review({
      doctor: doctorId,
      patient: patientId,
      rating,
      comment
    });
    await newReview.save();

    doctor.reviews.push(newReview);
    await doctor.save();

    res.status(200).json({ message: 'Review added to doctor profile successfully', doctor });
  } catch (error) {
    console.error('Error adding review to doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getReviewsForDoctorProfile = async (req, res) => {
  try {
    const { id: doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId).populate('reviews');

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    const reviews = doctor.reviews;

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error retrieving reviews for doctor profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
  addPatientToDoctorProfile,
  getPatientsForDoctorProfile,
  addReviewToDoctorProfile,
  getReviewsForDoctorProfile
};