// njibou les modules l hajetna behom
const express = require('express');           // Framework bech na5el9ou e serveur
const app = express();                         //  serveur créé
require('dotenv').config();                    // na9raw les variables fl fichier .env
const userRoute = require('./routes/userRoute');   // Routes lel users
const authRoute = require('./routes/authRoute');   // Routes lel authentification (register/login)
const cors = require('cors');                  
const cookieParser = require('cookie-parser'); // bech nakraw l cookies
const mongoose = require('mongoose');          // bech nconectiw ala mongodb

// Port du serveur
const PORT = process.env.PORT || 5000;

// ------------------- MIDDLEWARES -------------------

// nautorisiw les requettes ml front
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:60398'], 
  methods: ['GET','POST','PUT','DELETE','PATCH'], 
  credentials: true 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //bech nakraw les données l jetna ml formulaire html
app.use(cookieParser()); // nakraw l cookies

// ------------------- ROUTES -------------------
app.use('/user', userRoute); 
app.use('/auth', authRoute); 

// ------------------- connexion lel base -------------------
const connect = async () => {
  try {
    // Connexion lel base mte3i ProjectManagement 
    await mongoose.connect("mongodb://127.0.0.1:27017/ProjectManagement");
    console.log("✅ MongoDB database connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // nwa9fou serveur ken l connexon mat3adetech
  }
};
connect();

// ------------------- nlanciw e serveur -------------------
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
