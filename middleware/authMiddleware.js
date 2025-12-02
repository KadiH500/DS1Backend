const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware bech nverifiw token JWT
const verifyToken = async (req, res, next) => {
  try {
    // nrecuperiw token mel header Authorization : "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token manquant" });

    const token = authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: "Token manquant" });

    // nverifiw token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Token invalide" });

    // nrecuperiw l user ml bd mn ghir pswd
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    req.user = {
      id: user._id.toString(),
      role: user.role,
      login: user.login,
      nom: user.nom
    };

    next(); // bech netadew lel middleware lbaedou
  } catch (err) {
    res.status(401).json({ message: "Erreur d'authentification", error: err.message });
  }
};

module.exports = verifyToken;
