const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/', doctorController.createDoctorProfile);
router.put('/:id', doctorController.updateDoctorProfile);
router.delete('/:id', doctorController.deleteDoctorProfile);
router.post('/:id/patients', doctorController.addPatientToDoctorProfile);
router.get('/:id/patients', doctorController.getPatientsForDoctorProfile);
router.post('/:id/reviews', doctorController.addReviewToDoctorProfile);
router.get('/:id/reviews', doctorController.getReviewsForDoctorProfile);

module.exports = router;