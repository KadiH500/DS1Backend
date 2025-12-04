const express = require('express');
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getMyProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController.js');

const { authenticateToken, isManager } = require('../middleware/authMiddleware.js');

// ------------------ routes !lel manager ------------------
// ken lmanager, inajem yaachouf kol projet
router.get('/all', authenticateToken, isManager, getAllProjects);

// ------------------ routes lel user normal ------------------
// inajem user yaamel CRUD 3la projet mta3ou
router.get('/me', authenticateToken, getMyProjects); // yjiw projets mta3 l user
router.post('/create', authenticateToken, createProject); // créer projet
router.put('/:id', authenticateToken, updateProject);    // update projet (proprietaire wala manager)
router.delete('/:id', authenticateToken, deleteProject); // delete projet (proprietaire wala manager)

module.exports = router;
