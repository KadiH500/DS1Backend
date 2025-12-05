const mongoose = require('mongoose');

// schema mta task
const taskSchema = new mongoose.Schema({
  titre: { 
    type: String, 
    required: true, // titre obligatoire 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  statut: { 
    type: String, 
    enum: ['todo', 'doing', 'done'], // ken mahoumch parmi ces statuts → erreur
    default: 'todo' 
  },
  deadline: { 
    type: Date 
  },
  projet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', // relation avec un projet
    required: true 
  },
  utilisateurAssigné: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // relation avec utilisateur assigné
  },
  dateCreation: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Task', taskSchema);
