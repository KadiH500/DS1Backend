const Projet = require('../models/projetModel'); //nimportiw lmodel mta lprojet

// creation ma lprojet; ay user injm yaml prjt
const createProjet = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;
    const proprietaire = req.user.id; // id mta3 l'utilisateur connecté

    // nverifiw statut valide
    const validStatuts = ["en cours", "terminé", "en pause"];
    if (statut && !validStatuts.includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const projet = new Projet({ nom, description, statut, proprietaire });
    await projet.save();

    res.status(201).json({ message: "Projet créé", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// visibilité al projeyet lkol; ken lel manager
const getAllProjets = async (req, res) => {
  try {
    const projets = await Projet.find().populate('proprietaire', '-password'); // nabathou info utilisateur sans mdp
    res.status(200).json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// visibilité lel user al projeyet mte3ou
const getMyProjets = async (req, res) => {
  try {
    const projets = await Projet.find({ proprietaire: req.user.id });
    res.status(200).json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// update mta3 projet
const updateProjet = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet non trouvé" });

    // ken l'utilisateur normal : ibadel ken fi projeyetou
    if (req.user.role !== "manager" && projet.proprietaire.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    Object.assign(projet, req.body); // nupdatiw champs li bch yabathou
    await projet.save();

    res.status(200).json({ message: "Projet mis à jour", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// supprimer un projet
const deleteProjet = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet non trouvé" });

    // ken l'utilisateur normal : il peut supprimer seulement ses projets
    if (req.user.role !== "manager" && projet.proprietaire.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    await projet.remove();
    res.status(200).json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = {
  createProjet,
  getAllProjets,
  getMyProjets,
  updateProjet,
  deleteProjet
};
