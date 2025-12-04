const User = require('../models/userModel'); // importation mta lmodel user bch tinteracti mta maa l bd
const bcrypt = require('bcryptjs');          // pour hasher et comparer les psw
const jwt = require('jsonwebtoken');         // pour créer et vérifier les tokens JWT

// fonctions d'authentification

// register
const register = async (req, res) => {
  try {
    const { nom, login, password, role } = req.body;

    // nverifiw ken fama user existe deja fel base b fared login 
    const existingUser = await User.findOne({ login });
    if (existingUser) return res.status(400).json({ message: "Login déjà utilisé" });

    // hash mta password
    const hashedPassword = await bcrypt.hash(password, 10);

    // création mta utilisateur jdid
    const user = new User({ nom, login, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// login 
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // chercher l'user par login
    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: "Login ou mot de passe incorrect" });

    // ncompariw l pswrd bel pswrd hashé fel bd
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Login ou mot de passe incorrect" });

    // creation mta token limite:1j
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // nabathou token w infos mta luser
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// logout
const logout = async (req, res) => {
  // simple message, token reste côté client
  res.json({ message: "Déconnecté" });
};


module.exports = {
  register,
  login,
  logout
};
