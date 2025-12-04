const mongoose = require('mongoose');

// schema Projet
const projetSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true, 
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  statut: {
    type: String,
    enum: ['en cours', 'terminé', 'en pause'], 
    default: 'en cours'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Projet', projetSchema);
