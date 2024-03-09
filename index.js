const express = require('express');
const fileUpload = require('express-fileupload');
const uploadRoutes = require('./src/routes/uploadRoutes');
const userRoutes = require('./src/routes/userRoutes');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing form data
app.use(fileUpload());

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/user', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
