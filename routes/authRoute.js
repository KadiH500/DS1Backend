const express = require('express');
const {
  register,
  login,
  logout,
  getMe
} = require('../controllers/authController.js');

const verifyToken = require('../middleware/authMiddleware.js');

const router = express.Router();

 
//    inscri
// hedhi route bech tamel inscri l user jdid, 
// howa yabathelna login psw nom wahna nsajlouh fel base


router.post("/register", register);


//    login
//   hedhi bch yaml login: ihot login w pswd wken ken shih yrajalou JWT token

router.post("/login", login);


//   logout
//   Logout simple.
//   ma na3mlouch destruction token fil backend
  

router.post("/logout", logout);


//   verify
//   hedhi route protégée, lezem token bch todkhel
//   k ikoun valid iraja3 info mta3 user connecté

router.get("/verify", verifyToken, getMe);

module.exports = router;
