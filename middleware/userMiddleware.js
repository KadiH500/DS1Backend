// hedha middleware bech yamel vérification l role mtaa l user

module.exports.roleMiddleware = function (role) {
  return (req, res, next) => {

    // nverifiw ken luser mconnecti
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non connecté" });
    }

    // nverifiw kn lutilisateur ando e role demandé
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
    }

    next(); // nadiw lel route baad l vérification
  };
};
