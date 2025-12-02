const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema user
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true, 
    trim: true
  },
  login: {
    type: String,
    required: true, 
    unique: true,   
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'manager'], 
    default: 'user'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

// Middleware bech nhachiw l psw kbal mansaviw
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // ken matbadalech manhachwech
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// méthode bch ncompariw les mdp
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);