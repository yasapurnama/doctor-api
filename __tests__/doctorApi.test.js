const request = require('supertest');
const { app, mongoose } = require('../app');

describe('Doctor Profile API', () => {
  let doctorId;
  let patientId;

  it('should create a new doctor profile', async () => {
    const newProfile = {
      firstName: 'Purnama',
      lastName: 'Yasa',
      location: 'Bali',
      specialty: 'Cardiology',
      experiences: ['Cardiologist at Denpasar Hospital'],
      educations: ['MD from University of Indonesia'],
    };

    const response = await request(app)
      .post('/api/doctors')
      .send(newProfile);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('doctor');
    expect(response.body.doctor).toHaveProperty('_id');

    doctorId = response.body.doctor._id;
  });

  it('should update an existing doctor profile', async () => {
    const updatedProfile = {
      firstName: 'Purnama',
      lastName: 'Yasa',
      location: 'Bali',
      specialty: 'Neurology',
      experiences: ['Neurologist at Denpasar Hospital'],
      educations: ['MD from University of Indonesia'],
    };

    const response = await request(app)
      .put(`/api/doctors/${doctorId}`)
      .send(updatedProfile);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('doctor');
    expect(response.body.doctor).toHaveProperty('_id', doctorId);
  });

  it('should add patients to a doctor profile', async () => {
    const patientsToAdd = { firstName: 'Hendray', lastName: 'Yahya', age: 30 };

    const response = await request(app)
      .post(`/api/doctors/${doctorId}/patients`)
      .send(patientsToAdd);

    expect(response.statusCode).toBe(200);
    expect(response.body.doctor).toHaveProperty('patients');
    expect(response.body.doctor.patients.length).toBeGreaterThan(0);

    patientId = response.body.doctor.patients[0]._id || response.body.doctor.patients[0];
  });

  it('should fetch the list of patients associated with a doctor profile', async () => {
    const response = await request(app)
      .get(`/api/doctors/${doctorId}/patients`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('patients');
    expect(response.body.patients.length).toBeGreaterThan(0);
  });

  it('should add a review from a patient to a doctor profile', async () => {
    const reviewData = {
      patientId,
      rating: 5,
      comment: 'Very Good!',
    };

    const response = await request(app)
      .post(`/api/doctors/${doctorId}/reviews`)
      .send(reviewData);

    expect(response.statusCode).toBe(200);
    expect(response.body.doctor).toHaveProperty('reviews');
    expect(response.body.doctor.reviews.length).toBeGreaterThan(0);
  });

  it('should fetch reviews from patients associated with a doctor profile', async () => {
    const response = await request(app)
      .get(`/api/doctors/${doctorId}/reviews`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('reviews');
    expect(response.body.reviews.length).toBeGreaterThan(0);
  });

  it('should delete the doctor profile', async () => {
    const response = await request(app)
      .delete(`/api/doctors/${doctorId}`);

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
    app.close();
  });
});