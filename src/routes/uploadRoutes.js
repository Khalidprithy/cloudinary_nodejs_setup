// src/routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../../src/controller/uploadController');

// POST route for uploading an image
router.post('/image', uploadController.uploadImage);
router.delete('/image', uploadController.deleteImage);

module.exports = router;
