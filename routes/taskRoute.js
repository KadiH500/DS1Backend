const express = require('express');
const router = express.Router();
const { authenticateToken, isManager } = require('../middleware/authMiddleware');
const { createTask, getTasksByProject, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

// bch nrecuperiw tache mta projet
router.post('/', authenticateToken, createTask);

// nrecuperiw tachet lkol mta3 lprjt
router.get('/project/:projetId', authenticateToken, getTasksByProject);

// nrecuperiw tache bel id
router.get('/:id', authenticateToken, getTaskById);

// maj mta tache
router.put('/:id', authenticateToken, updateTask);

// tafsikh tache ; lmanager barek
router.delete('/:id', authenticateToken, isManager, deleteTask);

module.exports = router;
