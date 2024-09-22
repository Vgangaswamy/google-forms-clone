const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/forms'); // Import form routes
const authRoutes = require('./routes/auth');  // Import auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api', formRoutes);       // Form-related routes
app.use('/api/auth', authRoutes);  // Auth-related routes

// MongoDB connection
mongoose.connect("mongodb+srv://vidyagowda0629:2YiuXQWDkaJsUAcK@cluster0.yk8rd.mongodb.net/google-forms-clone?retryWrites=true&w=majority")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Simple root route
app.get('/', (req, res) => {
  res.send('Google Forms Clone API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
