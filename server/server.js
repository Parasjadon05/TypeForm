const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/forms');
const responseRoutes = require('./routes/responses');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));