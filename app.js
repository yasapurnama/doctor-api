const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const doctorRoutes = require('./routes/doctors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/doctor-api';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/doctors', doctorRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
const appServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app: appServer,
  mongoose
}