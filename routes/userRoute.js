const express = require('express');
const { 
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateMyProfile 
} = require('../controllers/userController.js');

const { authenticateToken, isManager } = require('../middleware/authMiddleware'); // middlewares ta3 l'authentification




const router = express.Router();

// ===== routes lel admin =====
// hedhi routes ken manager 
router.get("/all", authenticateToken, isManager, getAllUsers); // jibli kol l users
router.get("/:id", authenticateToken, isManager, getUserById); // jibli user par id
router.put("/:id", authenticateToken, isManager, updateUser); // update user par admin
router.delete("/:id" ,authenticateToken, isManager, deleteUser); // delete user

// ===== routes lel user normal =====
// hedhi route bech user updati profil mte3ou
router.put("/me/update", authenticateToken, updateMyProfile);

module.exports = router;
