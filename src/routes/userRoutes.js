// src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../src/controller/userController');

// POST route for uploading an image
router.post('/login', userController.Login);

module.exports = router;
