// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // schema user
// const userSchema = new mongoose.Schema({
//   nom: {
//     type: String,
//     required: true, 
//     trim: true
//   },
//   login: {
//     type: String,
//     required: true, 
//     unique: true,   
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['user', 'manager'], 
//     default: 'user'
//   },
//   dateCreation: {
//     type: Date,
//     default: Date.now
//   }
// });

// // middleware bech nhachiw l psw kbal mansaviw
// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return ; // ken matbadalech manhachwech
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
  
// });

// // méthode bch ncompariw les mdp
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
//************************************************************************************************************** */
// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'manager'], default: 'user' },
  dateCreation: { type: Date, default: Date.now }
});

//  Hook pre-save SANS next() car async
UserSchema.pre('save', async function () {
  // Si le mot de passe n'a pas été modifié → on ne fait rien
  if (!this.isModified('password')) return ;

  // Hash du mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});

// Export modèle
module.exports = mongoose.model('User', UserSchema);