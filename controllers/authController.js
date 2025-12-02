const User = require('../models/User'); // nimportiw lmodele user

// partie manager

// get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // manabathouch l psw
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    Object.assign(user, req.body); 
    await user.save();

    res.status(200).json({ message: "Utilisateur mis à jour", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.remove();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

//partie utilisateur

// get
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // manabathouch el psw
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// update
const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    Object.assign(user, req.body); // nupdatiw les champs l tbathou
    await user.save();

    res.status(200).json({ message: "Profil mis à jour", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// delete
const deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.remove();
    res.status(200).json({ message: "Compte supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile
};
