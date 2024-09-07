const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://vidyagowda0629:2YiuXQWDkaJsUAcK@cluster0.yk8rd.mongodb.net/google-forms-clone?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Import form routes
const formRoutes = require('./routes/forms');

// Use the form routes
app.use('/api', formRoutes);

// Use the auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Simple route
app.get('/', (req, res) => {
    res.send('Google Forms Clone API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
