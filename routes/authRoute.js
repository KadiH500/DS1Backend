const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController.js');


// register
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);



module.exports = router;
