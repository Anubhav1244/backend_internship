const express = require('express');
const router = express.Router();

const {login, register} = require('../Controller/authController');

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);

module.exports = router;