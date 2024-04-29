// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./User'); // Import the User schema

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MONGO_URL = 'mongodb+srv://kanth1234:kanth1234@cluster0.quwryth.mongodb.net/ARTs'; // Replace with your MongoDB URL
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error:'));

// Register endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password, firstName, lastName, mobileNumber, gender, dateOfBirth } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      mobileNumber,
      gender,
      dateOfBirth,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
