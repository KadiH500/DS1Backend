const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile
} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

//partie mta3 lmanager fel crud

// get users 
router.get("/", verifyToken, roleMiddleware("manager"), getAllUsers);

// get user par ID 
router.get("/:id", verifyToken, roleMiddleware("manager"), getUserById);

// update user 
router.put("/:id", verifyToken, roleMiddleware("manager"), updateUser);

// delete user 
router.delete("/:id", verifyToken, roleMiddleware("manager"), deleteUser);

// paertie user

// get profil
router.get("/me/profile", verifyToken, getMyProfile);

// update profil
router.put("/me/profile", verifyToken, updateMyProfile);

// delete compte
router.delete("/me/profile", verifyToken, deleteMyProfile);

module.exports = router;
