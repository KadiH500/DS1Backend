const User = require("../models/userModel");

// admin: irecuperi l users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// admin: irecuperi l user bl id 
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// admin: function bch imodifi l user 
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// admin: fct bch ifasakh l user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// crud user normal 
// Obtenir son propre profil
 exports.getMyProfile = async (req, res) => {
   try {
     const user = await User.findById(req.user.id).select('-password');
     res.status(200).json(user);
   } catch (err) {
     res.status(500).json({ message: "Erreur serveur", error: err.message });
   }
 };
// donner la main alutilisateur de modifier son pofil
exports.updateMyProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Mettre à jour son propre profil
 exports.updateMyProfile = async (req, res) => {
   try {
     const user = await User.findById(req.user.id);
     Object.assign(user, req.body); // Mettre à jour les champs envoyés
     await user.save();
     res.status(200).json({ message: "Profil mis à jour", user });
   } catch (err) {
     res.status(500).json({ message: "Erreur serveur", error: err.message });
   }
 };
 // Supprimer son propre profil
 exports.deleteMyProfile = async (req, res) => {
   try {
     const user = await User.findById(req.user.id);
     await user.remove();
     res.status(200).json({ message: "Compte supprimé" });
   } catch (err) {
     res.status(500).json({ message: "Erreur serveur", error: err.message });
   }
 };