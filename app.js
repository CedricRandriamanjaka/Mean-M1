const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const RouterProduit = require('./routes/produit');
const RouterUtilisateur = require('./routes/utilisateur');
const RouterHoraire = require('./routes/horaireEmploye');
const RouterProfil = require('./routes/profilEmployeretClient');
const RouteFavori = require("./routes/favori");


var apiCompetences = require("./routes/competence");
var apiServices = require("./routes/service");
var apiProfilServices = require("./routes/profilService");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/services", apiServices)
app.use("/api/competences", apiCompetences) 
app.use("/api/profilService", apiProfilServices)

var mongoURI = "mongodb+srv://Cedric:Cedric@meanproject.vuk6uvm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(() => {
    console.log("connection reussit")
}).catch((error) => {
    console.log(error)
});

app.use(cors());

// app.use('/api/produit/', RouterProduit)
app.use('/api/utilisateur/', RouterUtilisateur)
app.use('/api/horaire/', RouterHoraire)
app.use('/api/profilEmployeretClient/', RouterProfil)
app.use('/api/favori/', RouteFavori)

app.get('/', (req, res) => {
    res.send("hello word")
});

module.exports = app;