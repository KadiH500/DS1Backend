const Task = require('../models/TaskModel');

// créer une tache
const createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projet, utilisateurAssigné } = req.body;

    // creation tache
    const task = new Task({ 
      titre, description, statut, deadline, projet, utilisateurAssigné 
    });

    await task.save();
    res.status(201).json({ message: "Tâche créée", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// nrecuperiw les taches lkol mta lprojet
const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ projet: req.params.projetId })
                            .populate('projet')
                            .populate('utilisateurAssigné', '-password');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// nrecuperiw tache bel id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
                           .populate('projet')
                           .populate('utilisateurAssigné', '-password');
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// maj mta tache
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Tâche mise à jour", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// nfaskhou tache
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { createTask, getTasksByProject, getTaskById, updateTask, deleteTask };
